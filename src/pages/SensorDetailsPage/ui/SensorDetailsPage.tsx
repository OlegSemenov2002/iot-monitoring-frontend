import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { SensorCard } from 'entities/Sensor/ui/SensorCard';
import { useParams } from 'react-router-dom';
import { useGetSensorQuery } from 'shared/api/sensorApi';
import cls from './SensorDetailsPage.module.scss';
import React, {memo} from "react";
import {useGetLastAlarmsByDeviceIdQuery} from "shared/api/alarmApi";
import {AlarmList} from "widgets/AlarmList";


interface SensorDetailsPageProps {
    className?: string;
}

 const  SensorDetailsPage = ({ className }: SensorDetailsPageProps) => {
    const { t } = useTranslation();
    const { id } = useParams<{ id: string }>();

    const { data: sensor, isLoading, error } = useGetSensorQuery(Number(id));



    if (isLoading) return <div>{t('Загрузка...')}</div>;
    if (error || !sensor) return <div>{t('Ошибка загрузки данных')}</div>;

    const s = sensor; // если API возвращает массив

    const isMs0101 = true;

    return (
        <div className={classNames(cls.SensorPage$, {}, [className])}>
            <SensorCard sensor={sensor} />
            <AlarmList sensorId={Number(id)} />
        </div>
    );
};

export default memo(SensorDetailsPage);
