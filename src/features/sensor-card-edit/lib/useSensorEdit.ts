import { useCallback, useEffect, useState } from 'react';

import { useUpdateSensorMutation } from 'shared/api/sensorApi';
import {Sensor} from "entities/Sensor/model/types/sensor";

export const useSensorEdit = (sensor: Sensor) => {
    const [state, setState] = useState(() => ({
        form: { ...sensor },
        isEditing: false,
        isDirty: false,
        error: undefined as string | undefined,
    }));

    const [updateSensor, updateStatus] = useUpdateSensorMutation();

    // если sensor обновился извне (RTK Query перезаписал)
    // и мы НЕ в режиме редактирования → обновляем форму
    useEffect(() => {
        setState(prev => {
            if (!prev.isEditing) {
                return {
                    ...prev,
                    form: { ...sensor },
                    isDirty: false,
                };
            }
            return prev;
        });
    }, [sensor]);

    const startEdit = useCallback(() => {
        setState(prev => ({
            ...prev,
            form: { ...prev.form }, // ← берём последнюю известную версию
            isEditing: true,
            isDirty: false,
        }));
    }, []);

    const updateField = useCallback(
        (field: keyof Sensor, value: any) => {

            setState(prev => {
                const newForm = { ...prev.form, [field]: value };
                return {
                    ...prev,
                    form: newForm,
                    isDirty: newForm[field] !== sensor[field],
                };
            });


        },
        [sensor],
    );

    const cancelEdit = useCallback(() => {
        setState(prev => ({
            ...prev,
            form: { ...sensor },
            isEditing: false,
            isDirty: false,
            error: undefined,
        }));
    }, [sensor]);

    const save = useCallback(async () => {
        try {
            await updateSensor({
                deviceId: sensor.id,
                data: state.form,
            }).unwrap();

            setState(prev => ({
                ...prev,
                isEditing: false,
                isDirty: false,
                error: undefined,
            }));
        } catch (e: any) {
            setState(prev => ({
                ...prev,
                error: e?.message || 'Update failed',
            }));
        }

    }, [state.form, sensor]);

    return {
        form: state.form,
        isEditing: state.isEditing,
        isDirty: state.isDirty,
        error: state.error,
        isSaving: updateStatus.isLoading,

        startEdit,
        updateField,
        cancelEdit,
        save,
    };
};
