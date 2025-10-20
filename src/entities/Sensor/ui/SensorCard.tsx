import {classNames} from "shared/lib/classNames/classNames";
import cls from './SensorCard.module.scss';
import {useTranslation} from "react-i18next";
import {useGetSensorQuery} from "shared/api/sensorApi";
import {useParams} from "react-router-dom";
import {Sensor} from "entities/Sensor/model/types/sensor";


interface SensorCardProps {
    className?: string;
    sensor: Sensor;
}

export const SensorCard = ({className, sensor }:SensorCardProps) => {
    const { t } = useTranslation();


        return (
        <div className={classNames(cls.SensorCard, {}, [className])}>
            <h3>{t('Sensor')} #{sensor.id}</h3>
            <p>{t('Device EUI')}: {sensor.device_eui}</p>
            <p>{t('Battery')}: {sensor.battery}%</p>
            <p>{t('Description')}: {sensor.description}</p>
            <p>{t('Last Activity')}: {sensor.last_act}</p>

        </div>
    );
};
