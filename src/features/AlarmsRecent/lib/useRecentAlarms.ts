import { useGetAlarmsQuery } from 'shared/api/alarmApi';
import { SensorAlarm } from 'entities/Sensor/model/types/sensor';
import { useMemo } from 'react';

interface UseRecentAlarmsParams {
    maxItems?: number;
}

export const useRecentAlarms = ({ maxItems = 10 }: UseRecentAlarmsParams = {}) => {
    const { data: alarms, isLoading } = useGetAlarmsQuery();

    const recentAlarms: SensorAlarm[] = useMemo(() => {
        if (!alarms) return [];
        return [...alarms]
            .sort((a, b) => new Date(b.date_time).getTime() - new Date(a.date_time).getTime())
            .slice(0, maxItems);
    }, [alarms, maxItems]);

    return { recentAlarms, isLoading };
};
