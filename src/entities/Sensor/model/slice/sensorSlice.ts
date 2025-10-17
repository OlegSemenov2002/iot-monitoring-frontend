import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { sensorApi } from 'shared/api/sensorApi';
import type { Sensor } from '../types/sensor';

const sensorAdapter = createEntityAdapter<Sensor>({
    selectId: (sensor) => sensor.id,
    sortComparer: (a, b) => a.description.localeCompare(b.description),
});

const sensorSlice = createSlice({
    name: 'sensor',
    initialState: sensorAdapter.getInitialState(),
    reducers: {
        // Пример ручного обновления
        updateSensor: sensorAdapter.updateOne,
        addSensor: sensorAdapter.addOne,
        removeSensor: sensorAdapter.removeOne,
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            sensorApi.endpoints.getSensors.matchFulfilled,
            (state, action) => {
                sensorAdapter.setAll(state, action.payload);
            }
        );
    },
});

export const {
    selectAll: selectAllSensors,
    selectById: selectSensorById,
} = sensorAdapter.getSelectors((state: any) => state.sensor);

export const { updateSensor, addSensor, removeSensor } = sensorSlice.actions;
export default sensorSlice.reducer;
