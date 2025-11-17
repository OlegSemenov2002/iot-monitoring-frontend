
import { Alarm } from '../types/Alarm';
import {Sensor, SensorAlarm} from "entities/Sensor/model/types/sensor";
import {ChartData} from "shared/api/alarmApi";
export function mapMultipleDevicesAlarmsToChartData(
    alarms: SensorAlarm[],
    sensors: Sensor[],
    range: { from: string; to: string } | { lastDays: number }
): ChartData[] {

    // Генерация списка дней
    let dates: string[] = [];
    if ("lastDays" in range) {
        const today = new Date();
        for (let i = 0; i < range.lastDays; i++) {
            const d = new Date(today);
            d.setDate(today.getDate() - i);
            dates.push(d.toISOString().split("T")[0]); // ISO формат YYYY-MM-DD
        }
    } else {
        const start = new Date(range.from);
        const end = new Date(range.to);
        for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
            dates.push(d.toISOString().split("T")[0]);
        }
    }

    // Создание шаблона устройства → дата → значение
    const groupedByDevice: Record<string, Record<string, number>> = {};
    sensors.forEach(sensor => {
        const id = String(sensor.id);
        groupedByDevice[id] = {};
        dates.forEach(date => {
            groupedByDevice[id][date] = 0;
        });
    });

    // Счётчик тревог
    alarms.forEach(alarm => {
        const id = String(alarm.device_id);
        const date = new Date(alarm.date_time).toISOString().split("T")[0]; // Точно совпадение с шаблоном
        if (groupedByDevice[id]?.[date] !== undefined) {
            groupedByDevice[id][date] += 1 //Number(alarm.notify ?? 0);
        }
    });



    // Преобразование к ChartData
    let res =  Object.entries(groupedByDevice).map(([deviceId, values]) => ({
        id: `Sensor ${deviceId}`,
        name: `Sensor ${deviceId}`,
        color: `hsl(${Math.random() * 360}, 70%, 50%)`,
        data: Object.entries(values)
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([x, y]) => ({ x, y })),
    }));

    console.log(res);

    return res
}
