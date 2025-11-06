import {Alarm} from "entities/Alarm";
import cls from "widgets/AlarmList/ui/AlarmList/AlarmList.module.scss";
import React from "react";

export function AlarmListItem({ alarm }: { alarm: Alarm }) {
    return (
        <li className={cls.alarmItem}>
            <div>#{alarm.id}</div>
            <div>{alarm.date_time}</div>
            <div>{alarm.date_fix ? 'Исправлено' : 'Активно'}</div>
        </li>
    );
}
