import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import {SENSOR_CARD_VIEWS, SensorCard} from 'entities/Sensor/ui/SensorCard/SensorCard';
import { useParams } from 'react-router-dom';
import { useGetSensorQuery } from 'shared/api/sensorApi';
import React, {memo, useCallback, useRef} from 'react';
import { useGetLastAlarmsByDeviceIdQuery } from 'shared/api/alarmApi';
import { AlarmList } from 'widgets/AlarmList';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import { Page } from 'shared/ui/Page/Page';
import cls from './SensorDetailsPage.module.scss';

interface SensorDetailsPageProps {
    className?: string;
}

const SensorDetailsPage = ({ className }: SensorDetailsPageProps) => {
    const { t } = useTranslation();
    const { id } = useParams<{ id: string }>();

    const { data: sensor, isLoading, error } = useGetSensorQuery(Number(id));
    const pageRef = useRef<HTMLDivElement | null>(null);


    const handleScrollEnd = useCallback(() => {
        console.log('SCROLL END'); // ← ПРОВЕРЬ В КОНСОЛИ
    }, []);

    if (isLoading) {
        return (
            <Skeleton width={600} height={200} />
        );
    }
    if (error || !sensor) return <div>{t('Ошибка загрузки данных')}</div>;

    const onScrollEnd = () => {

    }
    return (
        <Page ref={pageRef}>
            <SensorCard view={SENSOR_CARD_VIEWS.FULL} sensor={sensor} />
            <AlarmList sensorId={Number(id)} wrapperRef={pageRef} />
        </Page>
    );
};

export default memo(SensorDetailsPage);
