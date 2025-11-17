
import { useMemo } from 'react';
import { useGetSensorsQuery } from 'shared/api/sensorApi'; // RTK Query хук
import { useGetAlarmsQuery } from 'shared/api/alarmApi';   // RTK Query хук
import { mapMultipleDevicesAlarmsToChartData } from 'entities/Alarm/model/utils/mapMultipleDevicesAlarmsToChartData'; // Импорт map (если не переносим)



interface AlarmsChartParams {
    range?: { from: string; to: string } | { lastDays: number };
}

// Дефолтный диапазон (можно настроить)
const DEFAULT_RANGE = { from: '2025-08-27', to: '2025-09-05' }; // Или вычислить динамически: new Date() и т.д.

export const useAlarmsChartData = (params: AlarmsChartParams = {}) => {
    const { data: sensors, isLoading: isSensorsLoading } = useGetSensorsQuery();
    const { data: alarms, isLoading: isAlarmsLoading } = useGetAlarmsQuery();

    const isLoading = isSensorsLoading || isAlarmsLoading;

    const chartData = useMemo(() => {
        if (!sensors || !alarms || isLoading) return []; // Пустой массив при загрузке

        const range = params.range || DEFAULT_RANGE; // Используем переданный или дефолт

        return mapMultipleDevicesAlarmsToChartData(alarms, sensors, range);
    }, [sensors, alarms, isLoading, params.range]); // Зависимости для мемоизации

    return { chartData, isLoading };
};
