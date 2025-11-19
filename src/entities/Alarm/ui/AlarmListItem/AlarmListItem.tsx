import {Alarm} from "entities/Alarm";
import cls from "./AlarmList.module.scss";
import React from "react";

export function AlarmListItem({ alarm }: { alarm: Alarm }) {
    return (
        <li className={cls.alarmItem}>
            <div className={cls.id}># {alarm.id} / </div>
            <div className={cls.dateTime}>{alarm.date_time} / </div>
            <div className={cls.status}>
                {alarm.date_fix ? "Исправлено" : "Активно"}
            </div>
        </li>
    );
}
