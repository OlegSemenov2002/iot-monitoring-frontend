import React, {memo, MutableRefObject, useCallback, useEffect, useRef, useState} from 'react';
import { useGetLastAlarmsPartlyByDeviceIdQuery } from 'shared/api/alarmApi';
import {Alarm, AlarmListItem} from 'entities/Alarm';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import cls from './AlarmList.module.scss';
import {useInfiniteScroll} from "shared/lib/hooks/useInfiniteScroll/useInfiniteScroll";
import {usePageAlarms} from "features/AlarmList/lib/useGetPageAlarms";

interface AlarmListProps {
    className?: string;
    sensorId: number;
    onLoadNextAlarm?: () => void;
    wrapperRef?: MutableRefObject<HTMLDivElement | null>;
}




export const AlarmList = memo(({ className, sensorId,wrapperRef }: AlarmListProps) => {
    const { data, isLoading, isFetching, error, hasMore, loadNext } = usePageAlarms({ deviceId: sensorId });
    const triggerRef = useRef<HTMLDivElement | null>(null);

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
    if (isLoading) return <Skeleton width={1300} height={70} />;

    return (
        <div className={className}>
            <h3>Последние уведомления</h3>
            <ul className={cls.list}>
                {data.map((alarm) => (
                    <AlarmListItem key={alarm.id} alarm={alarm} />
                ))}
            </ul>
            {isFetching
                && (
                    <>
                        <Skeleton width={1500} height={50} />
                        <Skeleton width={1500} height={50} />
                        <Skeleton width={1500} height={50} />
                    </>
                )}

            <div ref={triggerRef} />
        </div>
    );
});
