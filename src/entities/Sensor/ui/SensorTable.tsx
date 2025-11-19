import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Sensor } from 'entities/Sensor/model/types/sensor';
import React from 'react';
import { Table } from 'shared/ui/Table/Table';
import cls from './SensorTable.module.scss';
import { SensorRow } from './SensorRow';

interface SensorTableProps {
    className?: string;
    sensors?: Sensor[];
}

export const SensorTable = ({ className, sensors }: SensorTableProps) => {
    const { t } = useTranslation();
    let content = null;

    if (sensors) {
        content = sensors.map((sensor) => (
            <SensorRow key={sensor.id} sensor={sensor} />
        ));
    }

    return (
        <Table className={classNames(cls.SensorTable, {}, [className])}>
            <thead>
            <tr>
                <th>#</th>
                <th>{t('Имя')}</th>
                <th>{t('Последняя активность')}</th>
                <th>{t('Заряд')}</th>
                <th>{t('Уведомления')}</th>
            </tr>
            </thead>
            <tbody>{content}</tbody>
        </Table>
    );
};
