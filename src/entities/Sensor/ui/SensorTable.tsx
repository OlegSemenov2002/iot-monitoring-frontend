import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Sensor } from 'entities/Sensor/model/types/sensor';
import { Switch } from 'shared/ui/Switch/Switch';
import { Table } from 'shared/ui/Table/Table';
import React from 'react';
import cls from './SensorTable.module.scss';
import { SensorRow } from './SensorRow';

interface SensorTableProps {
    className?: string;
    sensors?: Sensor[];
}

export const SensorTable = ({ className, sensors }:SensorTableProps) => {
    const { t } = useTranslation();
    let content;

    if (sensors) {
        content = (sensors?.map((sensor) => (
            <SensorRow key={sensor.id} sensor={sensor} />
        )));
    }

    return (
        <Table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Имя</th>
                    <th>Последняя активность</th>
                    <th>Заряд</th>
                    <th>Уведомления</th>
                </tr>
            </thead>
            <tbody>
                {content}
            </tbody>
        </Table>
    );
};
