import React, {memo} from "react";
import {classNames} from "shared/lib/classNames/classNames";
import cls from "widgets/AlarmList/ui/AlarmList/AlarmList.module.scss";
import {Bell, Laptop, Smartphone} from "lucide-react";
import {Alarm} from "entities/Alarm/model/types/Alarm";


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
                    Исправлено: {alarm.date_fix}
                </div>
            )}
        </div>
    </li>
));
