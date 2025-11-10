import {classNames, Mods} from 'shared/lib/classNames/classNames';
import {useTranslation} from 'react-i18next';
import {Sensor} from 'entities/Sensor/model/types/sensor';
import cls from './SensorCard.module.scss';
import {Button, ButtonSize} from "shared/ui/Button/Button";
import {Input} from "shared/ui/Input/Input";

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
    isDirty?: boolean;
    onChange: (field: keyof Sensor, value: any) => void;
    onEdit?: () => void;
    onSave?: () => void;
    onCancel?: () => void;
}

export const SensorCard = (props:SensorCardProps) => {
    const { t } = useTranslation();
    const {
        className,
        sensor,
        view = SENSOR_CARD_VIEWS.COMPACT,
        readonly = true,
        isDirty = false,
        onChange,
        onEdit,
        onSave,
        onCancel,
    } = props;


    const mods: Mods = {
        [cls[view]]: true,
    };

    return (
        <div className={classNames(cls.SensorCard, mods, [className])}>
            <div className={classNames(cls.SensorCard__header, mods, [className])}>
                <h3>
                    {t('Sensor')}
                    {' '}
                    #
                    {sensor.id}
                </h3>
                <Button
                    className={classNames(cls.SensorCard__button, {}, [className])}
                    size={ButtonSize.XL}
                    onClick={onEdit}
                >123</Button>
                <div className={classNames(cls.__icon, {}, [className])} />
            </div>
            <div className={classNames(cls.SensorCard__body, mods, [className])}>
                {view !== SENSOR_CARD_VIEWS.MINIMAL && (
                    <>
                        <p>{t('Device EUI')}: {sensor.device_eui}</p>
                        <p>{t('Last Activity')}: {sensor.last_act}</p>
                    </>
                )}

                <p>{t('Battery')}: {sensor.battery}%</p>

                {
                    !readonly && <Input />
                }
                {
                    readonly && <p>{t('Description')}: {sensor.description}</p>
                }


            </div>
        </div>
    );
};
