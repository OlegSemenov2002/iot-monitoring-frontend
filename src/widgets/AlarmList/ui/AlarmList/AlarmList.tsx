
import { classNames } from 'shared/lib/classNames/classNames';
import React, { memo, useRef } from 'react';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import cls from './AlarmList.module.scss';
import { useInfiniteScroll } from 'shared/lib/hooks/useInfiniteScroll/useInfiniteScroll';
import { usePageAlarms } from 'features/AlarmList/lib/useGetPageAlarms';
import { AlarmListItem } from 'entities/Alarm';
import {useTranslation} from "react-i18next";

interface AlarmListProps {
    className?: string;
    sensorId: number;
    onLoadNextAlarm?: () => void;
    wrapperRef?: React.MutableRefObject<HTMLDivElement | null>;
}

export const AlarmList = memo(({ className, sensorId, wrapperRef }: AlarmListProps) => {
    const { data, isLoading, isFetching, hasMore, loadNext } = usePageAlarms({ deviceId: sensorId });
    const triggerRef = useRef<HTMLDivElement | null>(null);
    const {t} = useTranslation();

    useInfiniteScroll({
        wrapperRef,
        triggerRef,
        callback: () => {
            if (hasMore && !isFetching) {
                loadNext();
            }
        },
        disabled: isFetching,
    });

    if (isLoading) return (
        <>
            <Skeleton className={cls.skeleton} width={1500} height={50} />
            <Skeleton className={cls.skeleton} width={1500} height={50} />
            <Skeleton className={cls.skeleton} width={1500} height={50} />
        </>
    );

    return (
        <div className={classNames(cls.AlarmList, {}, [className])}>
            <h3 className={cls.title}>{t('Последние уведомления')}</h3>
            <ul className={cls.list}>
                {data.map((alarm) => (
                    <AlarmListItem key={alarm.id} alarm={alarm} />
                ))}
            </ul>

            {isFetching && (
                <>
                    <Skeleton className={cls.skeleton} width={1500} height={50} />
                    <Skeleton className={cls.skeleton} width={1500} height={50} />
                    <Skeleton className={cls.skeleton} width={1500} height={50} />
                </>
            )}

            <div ref={triggerRef} />
        </div>
    );
});
