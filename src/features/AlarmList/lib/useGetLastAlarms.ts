import { useEffect, useMemo } from 'react';
import {useGetLastAlarmsByDeviceIdQuery} from "shared/api/alarmApi";


export const useGetLastAlarms = (deviceId: number, n: number = 10) => {
    const { data, isLoading, error, refetch } = useGetLastAlarmsByDeviceIdQuery({ deviceId, n });

    useEffect(() => {
        if (error) {
            console.error('Ошибка при получении alarms:', error);
        }
    }, [error]);

    const processedData = useMemo(() => {
        return data ? [...data].sort((a, b) => new Date(b.date_time).getTime() - new Date(a.date_time).getTime()) : [];
    }, [data]);

    return {
        data: processedData,
        isLoading,
        error,
        refetch
    };
};