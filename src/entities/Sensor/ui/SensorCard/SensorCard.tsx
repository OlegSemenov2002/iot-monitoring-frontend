import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Sensor } from 'entities/Sensor/model/types/sensor';
import cls from './SensorCard.module.scss';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Input, INPUT_VIEWS } from 'shared/ui/Input/Input';
import React, { useCallback } from 'react';
import { Text, TextAlign, TextTheme } from 'shared/ui/Text/Text';
import { Switch, SWITCH_SIZE } from 'shared/ui/Switch/Switch';
import { useToggleSensorNotify } from 'features/SensorNotifications';

export const SENSOR_CARD_VIEWS = {
    FULL: 'full',
    COMPACT: 'compact',
    MINIMAL: 'minimal',
} as const;

export type SensorCardView = typeof SENSOR_CARD_VIEWS[keyof typeof SENSOR_CARD_VIEWS];

interface SensorCardProps {
    className?: string;
    sensor: Sensor;
    view?: SensorCardView;
    readonly?: boolean;
    form?: Sensor;
    isDirty?: boolean;
    isSaving?: boolean;
    isEditing?: boolean;
    onChange: (field: keyof Sensor, value: any) => void;
    onEdit?: () => void;
    onSave?: () => void;
    onCancel?: () => void;
    error?: any;
}

export const SensorCard = (props: SensorCardProps) => {
    const { t } = useTranslation();
    const {
        className,
        sensor,
        view = SENSOR_CARD_VIEWS.COMPACT,
        readonly = true,
        form = sensor,
        isDirty = false,
        isSaving = false,
        isEditing = false,
        onChange,
        onEdit,
        onSave,
        onCancel,
        error,
    } = props;

    const { toggleNotify, isLoadingToggle, optimisticNotify } = useToggleSensorNotify();

    const handleChangeDescription = useCallback(
        (value: string) => {
            onChange('description', value);
        },
        [onChange],
    );

    const mods: Mods = {
        [cls[view]]: true,
    };

    if (error) {
        return (
            <Text
                theme={TextTheme.ERROR}
                align={TextAlign.CENTER}
                title={t('Произошла ошибка при сохранении.')}
            />
        );
    }

    const notifyValue =
        optimisticNotify[sensor.id] !== undefined
            ? optimisticNotify[sensor.id]
            : sensor.notify;

    const batteryPercent = Math.max(0, Math.min(100, sensor.battery ?? 0));

    return (
        <div className={classNames(cls.SensorCard, mods, [className])}>
            <div className={cls.headerRow}>
                <div className={cls.titleBlock}>
                    <span className={cls.titleLabel}>{t('Датчик')}</span>
                    <span className={cls.titleValue}>#{sensor.id}</span>
                </div>
                <div className={cls.headerControls}>
                    <div className={cls.notifyBlock}>
                        <span className={cls.notifyLabel}>{t('Уведомления')}</span>
                        <Switch
                            checked={notifyValue > 0}
                            onChange={() => toggleNotify(sensor.id, notifyValue)}
                            disabled={isLoadingToggle(sensor.id)}
                            size={SWITCH_SIZE.BIG}
                        />
                    </div>

                    <div className={cls.actions}>
                        {readonly ? (
                            <Button
                                className={cls.editBtn}
                                theme={ButtonTheme.OUTLINE}
                                onClick={onEdit}
                                disabled={isSaving}
                            >
                                {t('Редактировать')}
                            </Button>
                        ) : (
                            <>
                                <Button
                                    className={cls.editBtn}
                                    theme={ButtonTheme.OUTLINE_RED}
                                    onClick={onCancel}
                                    disabled={isSaving}
                                >
                                    {t('Отменить')}
                                </Button>
                                <Button
                                    className={cls.saveBtn}
                                    theme={ButtonTheme.OUTLINE}
                                    onClick={onSave}
                                    disabled={isSaving}
                                >
                                    {t('Сохранить')}
                                </Button>
                            </>
                        )}
                    </div>
                </div>

                <div className={cls.icon} />
            </div>

            <div className={cls.contentRow}>
                <div className={cls.detailsCard}>
                    <div className={cls.detailsHeader}>{t('Details')}</div>

                    <div className={cls.detailsGrid}>
                        <div className={cls.detailsLabel}>{t('Имя')}</div>
                        <div className={cls.detailsValue}>
                            {!readonly ? (
                                <Input
                                    view={INPUT_VIEWS.IOT}
                                    value={form.description}
                                    placeholder={t('Description')}
                                    className={cls.input}
                                    onChange={handleChangeDescription}
                                    readonly={false}
                                />
                            ) : (
                                form.description || '—'
                            )}
                        </div>

                        <div className={cls.detailsLabel}>{t('Последняя активность')}</div>
                        <div className={cls.detailsValue}>
                            {sensor.last_act || '—'}
                        </div>

                        <div className={cls.detailsLabel}>Device EUI</div>
                        <div className={cls.detailsValue}>
                            {sensor.device_eui || '—'}
                        </div>

                        <div className={cls.detailsLabel}>{t('Заряд')}</div>
                        <div className={cls.detailsValue}>
                            <div className={cls.batteryValue}>
                                <span className={cls.batteryText}>{batteryPercent}%</span>
                                <div className={cls.batteryBar}>
                                    <div
                                        className={cls.batteryBarFill}
                                        style={{ width: `${batteryPercent}%` }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
