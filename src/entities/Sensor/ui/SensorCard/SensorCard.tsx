import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Sensor } from 'entities/Sensor/model/types/sensor';
import cls from './SensorCard.module.scss';

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

}

export const SensorCard = (props:SensorCardProps) => {
    const { t } = useTranslation();
    const {
        className,
        sensor,
        view = SENSOR_CARD_VIEWS.COMPACT,
    } = props;
    console.log(sensor)

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
                <div className={classNames(cls.__icon, mods, [className])} />
            </div>
            <div className={classNames(cls.SensorCard__body, mods, [className])}>
                {view !== SENSOR_CARD_VIEWS.MINIMAL && (
                    <>
                        <p>{t('Device EUI')}: {sensor.device_eui}</p>
                        <p>{t('Last Activity')}: {sensor.last_act}</p>
                    </>
                )}

                {/* Всегда показываем */}
                <p>{t('Battery')}: {sensor.battery}%</p>
                <p>{t('Description')}: {sensor.description}</p>

            </div>
        </div>
    );
};
