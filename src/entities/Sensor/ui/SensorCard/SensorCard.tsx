import {classNames, Mods} from 'shared/lib/classNames/classNames';
import {useTranslation} from 'react-i18next';
import {Sensor} from 'entities/Sensor/model/types/sensor';
import cls from './SensorCard.module.scss';
import {Button, ButtonSize, ButtonTheme} from "shared/ui/Button/Button";
import {Input, INPUT_VIEWS} from "shared/ui/Input/Input";
import React, {useCallback, useEffect, useState} from "react";
import {Text, TextAlign, TextTheme} from "shared/ui/Text/Text";
import {Switch, SWITCH_SIZE} from "shared/ui/Switch/Switch";
import {useToggleSensorNotify} from "features/SensorNotifications";

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
    form?:Sensor;
    isDirty?: boolean;
    isSaving?: boolean;
    isEditing?: boolean;
    onChange: (field: keyof Sensor, value: any) => void;
    onEdit?: () => void;
    onSave?: () => void;
    onCancel?: () => void;
    error?: any;
}

export const SensorCard = (props:SensorCardProps) => {
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






    const handleChangeDescription = useCallback((value: string) => {


        onChange('description', value);
    }, [onChange]);

    const mods: Mods = {
        [cls[view]]: true,
    };

    if(error){

        return (
            <Text
                theme={TextTheme.ERROR}
                align={TextAlign.CENTER}
                title={t('Произошла ошибка при сохранении.')}
            />
        )

    }


    return (
        <div className={classNames(cls.SensorCard, mods, [className])}>
            <div className={classNames(cls.SensorCard__header, mods, [className])}>
                <h3>
                    {t('Sensor')}
                    {' '}
                    #
                    {sensor.id}
                </h3>
                <Switch
                    checked={
                        optimisticNotify[sensor.id] !== undefined
                            ? optimisticNotify[sensor.id] > 0
                            : sensor.notify > 0
                    }
                    onChange={() =>
                        toggleNotify(
                            sensor.id,
                            optimisticNotify[sensor.id] !== undefined
                                ? optimisticNotify[sensor.id]
                                : sensor.notify
                        )
                    }
                    disabled={isLoadingToggle(sensor.id)}
                    size={SWITCH_SIZE.BIG}
                />
                {readonly
                    ? (
                        <Button
                            className={cls.editBtn}
                            theme={ButtonTheme.OUTLINE}
                            onClick={onEdit}
                            disabled={isSaving}
                        >
                            {t('Редактировать')}
                        </Button>
                    )
                    : (
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
                <div className={classNames(cls.__icon, {}, [className])} />
            </div>
            <div className={classNames(cls.SensorCard__body, mods, [className])}>

                {
                    !readonly &&
                    <Input
                        view={INPUT_VIEWS.IOT}
                        value={sensor.description}
                        placeholder={t('Description')}
                        className={cls.input}
                        onChange={handleChangeDescription}
                        readonly={readonly}
                    />
                }
                {
                    readonly && <p>{t('Description')}: {sensor.description}</p>
                }
                {view !== SENSOR_CARD_VIEWS.MINIMAL && (
                    <>
                        <p>{t('Device EUI')}: {sensor.device_eui}</p>
                        <p>{t('Last Activity')}: {sensor.last_act}</p>
                    </>
                )}

                <p>{t('Battery')}: {sensor.battery}%</p>




            </div>
        </div>
    );
};
