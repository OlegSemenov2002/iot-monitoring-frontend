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

interface AlarmItemProps {
    alarm: Alarm;
}

const formatDate = (dateStr?: string) =>
    dateStr ? new Date(dateStr).toLocaleString() : '';

const AlarmItem = memo(({ alarm }: AlarmItemProps) => (
    <li
        className={classNames(cls.alarmItem, {
            [cls.fixed]: !!alarm.date_fix,
        })}
    >
        <div className={cls.iconBox}>
            <Bell size={20} />
        </div>

        <div className={cls.alarmContent}>
            <div className={cls.header}>
                <span className={cls.date}>{formatDate(alarm.date_time)}</span>
            </div>

            <div className={cls.statuses}>
                <span
                    className={classNames(cls.status, {
                        [cls.active]: !!alarm.notify,
                    })}
                    title="Уведомление"
                >
                    <Bell size={14} /> {alarm.notify ? 'Вкл' : 'Выкл'}
                </span>
                <span
                    className={classNames(cls.status, {
                        [cls.active]: !!alarm.notify_lk,
                    })}
                    title="Личный кабинет"
                >
                    <Laptop size={14} /> {alarm.notify_lk ? 'Вкл' : 'Выкл'}
                </span>
                <span
                    className={classNames(cls.status, {
                        [cls.active]: !!alarm.notify_sms,
                    })}
                    title="SMS"
                >
                    <Smartphone size={14} /> {alarm.notify_sms ? 'Вкл' : 'Выкл'}
                </span>
            </div>

            {alarm.date_fix && (
                <div className={cls.dateFix}>
                    Исправлено: {formatDate(alarm.date_fix)}
                </div>
            )}
        </div>
    </li>
));

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
