import {classNames} from "shared/lib/classNames/classNames";
import cls from './AlarmList.module.scss';

import {Alarm} from "entities/Alarm/model/types/Alarm";
import {useGetLastAlarms} from "features/AlarmList";




interface AlarmListProps {
    className?: string;
    sensorId: number;
}

export const AlarmList = ({className, sensorId }:AlarmListProps) => {
    const { data, isLoading, error, refetch } = useGetLastAlarms(sensorId, 50);

    if (isLoading) return <div>Загрузка...</div>;
    if (error) return <div>Ошибка: {error} <button onClick={refetch}>Повторить</button></div>;

    return (
        <ul className={classNames(cls.AlarmList, {}, [className])}>
            {data.map((alarm:Alarm )=> <li key={alarm.id}>{alarm.date_time}</li>)}
        </ul>
    );
};

