import React, {memo, useMemo, useState} from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useGetLastAlarms } from 'features/AlarmList';
import { Alarm } from 'entities/Alarm/model/types/Alarm';
import { Bell, Laptop, Smartphone, RefreshCcw, Loader2 } from 'lucide-react';
import cls from './AlarmList.module.scss';
import {Skeleton} from "shared/ui/Skeleton/Skeleton";

interface AlarmListProps {
    className?: string;
    sensorId: number;
}


function AlarmItem(props: { alarm: any }) {
    return null;
}

export const AlarmList = ({ className, sensorId }: AlarmListProps) => {
    const { data, isLoading, error, refetch } = useGetLastAlarms(sensorId, 10);
    const alarms = useMemo(() => data ?? [], [data]);

    const active = alarms.filter(a => !a.date_fix);
    const fixed = alarms.filter(a => a.date_fix);

    const tabs = [
        { id: 'all', label: 'Все', list: alarms },
        { id: 'active', label: 'Активные', list: active },
        { id: 'fixed', label: 'Исправленные', list: fixed },
    ];

    const [activeTab, setActiveTab] = useState('all');

    if (isLoading) return (
        <>
            <Skeleton width={1300} height={70}/>
            <Skeleton width={1300} height={70}/>
            <Skeleton width={1300} height={70}/>
        </>
    )

    if (error) {
        return (
            <div className={cls.error}>
                Ошибка: {String(error)}
                <button className={cls.retryButton} onClick={refetch}>
                    <RefreshCcw size={14} /> Повторить
                </button>
            </div>
        );
    }

    const currentList = tabs.find(t => t.id === activeTab)?.list ?? [];

    return (
        <div className={classNames(cls.AlarmList, {}, [className])}>
            <h3 className={cls.title}>Последние уведомления</h3>

            <div className={cls.tabs}>
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        className={classNames(cls.tab, {
                            [cls.tabActive]: activeTab === tab.id,
                        })}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <ul className={cls.list}>
                {currentList.length ? (
                    currentList.map(alarm => (
                        <AlarmItem key={alarm.id} alarm={alarm} />
                    ))
                ) : (
                    <li className={cls.empty}>Нет уведомлений</li>
                )}
            </ul>
        </div>
    );
};
