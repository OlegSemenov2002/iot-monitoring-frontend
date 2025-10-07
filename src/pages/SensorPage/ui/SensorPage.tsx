import React from 'react';
import { useTranslation } from 'react-i18next';
import {Loader} from "shared/ui/Loader/Loader";
import {useGetSensorsQuery} from "entities/Sensor/api/sensorApi";
import {Table} from "shared/ui/Table/Table";
import {Switch} from 'shared/ui/Switch/Switch'
import {Sensor} from "entities/Sensor/model/types/sensor";



const SensorPage = () => {
    const { t } = useTranslation('SensorPage');

    const { data: sensors, isLoading, error } = useGetSensorsQuery();

    if (isLoading) return <Loader></Loader>
    if (error) return <div>Ошибка загрузки</div>;

    return (
        <Table >
            <thead>
            <tr>
                <th>#</th>
                <th>Имя</th>
                <th>Тип</th>
                <th>Последняя активность</th>
                <th>Заряд</th>
                <th>Уведомления</th>
            </tr>
            </thead>
            <tbody>
            {sensors?.map((sensor: Sensor) => (
                <tr key={sensor.id}>
                    <td>{sensor.id}</td>
                    <td>{sensor.description}</td>
                    <td>{sensor.model}</td>
                    <td>{sensor.last_act}</td>
                    <td>{sensor.battery}%</td>
                    <td>
                        {sensor.type === 'Smart-MS0101' ? (
                            <Switch checked={sensor.notify_loss > 0} onChange={()=>alert()}/> // Полная логика для MS0101
                        ) : (
                            <div>Заглушка (не MS0101)</div> // Заглушка
                        )}
                    </td>
                </tr>
            ))}
            </tbody>
        </Table>
    );
};

export default SensorPage;
