import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Switch } from 'shared/ui/Switch/Switch';
import React, { memo } from 'react';
import { Sensor } from 'entities/Sensor/model/types/sensor';

import cls from './SensorRow.module.scss';
import {Link} from "react-router-dom";
import {RoutePath} from "shared/config/routeConfig/routeConfig";
import {useToggleSensorNotify} from "features/SensorNotifications";

interface SensorRowProps {
    className?: string;
    sensor: Sensor;
}

export const SensorRow = memo(({ className, sensor }:SensorRowProps) => {
    const { t } = useTranslation();
    const { toggleNotify, isLoadingToggle, optimisticNotify } = useToggleSensorNotify();
    return (
        <tr key={sensor.id} className={classNames(cls.SensorRow, {}, [className])}>
            <td>
                <Link to={`${RoutePath.sensors}/${sensor.id}`}>
                    {sensor.id}
                </Link>
            </td>
            <td>
                <Link to={`${RoutePath.sensors}/${sensor.id}`}>
                    {sensor.description}
                </Link>
            </td>
            <td>{sensor.last_act}</td>
            <td>{sensor.battery}%</td>
            <td>
                {sensor.type === 1 ? (
                    <Switch
                        checked={
                            optimisticNotify[sensor.id] !== undefined
                                ? optimisticNotify[sensor.id] > 0
                                : sensor.notify > 0
                        }
                        onChange={() => toggleNotify(sensor.id, sensor.notify)}
                        disabled={isLoadingToggle(sensor.id)}
                    />
                ) : (
                    <div>{t('Заглушка (не MS0101)')}</div>
                )}
            </td>
        </tr>
    );
});
