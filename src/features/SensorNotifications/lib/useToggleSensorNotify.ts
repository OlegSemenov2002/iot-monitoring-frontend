import { useUpdateSensorNotifyMutation } from 'shared/api/sensorApi';
import { useState } from 'react';

export const useToggleSensorNotify = () => {
    const [updateSensorNotify] = useUpdateSensorNotifyMutation();
    const [loadingIds, setLoadingIds] = useState<number[]>([]);
    const [optimisticNotify, setOptimisticNotify] = useState<Record<number, number>>({});

    const toggleNotify = async (sensorId: number, currentStatus: number) => {
        const newStatus = currentStatus > 0 ? 0 : 1;
        setOptimisticNotify((prev) => ({ ...prev, [sensorId]: newStatus }));
        setLoadingIds((prev) => [...prev, sensorId]);

        try {
            await updateSensorNotify({ sensorId, notifyStatus: newStatus }).unwrap();
        } catch (e) {
            console.error('Ошибка при обновлении уведомлений:', e);
            setOptimisticNotify((prev) => ({ ...prev, [sensorId]: currentStatus }));
        } finally {
            setLoadingIds((prev) => prev.filter((id) => id !== sensorId));
        }
    };

    const isLoadingToggle = (sensorId: number) => loadingIds.includes(sensorId);

    return {
        toggleNotify,
        isLoadingToggle,
        optimisticNotify,
    };
};
