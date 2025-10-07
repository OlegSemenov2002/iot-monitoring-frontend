
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import type { Sensor } from './types';

const sensorAdapter = createEntityAdapter<Sensor>({
    selectId: (sensor) => sensor.id,
    sortComparer: (a, b) => a.description.localeCompare(b.description),
});

const sensorSlice = createSlice({
    name: 'sensor',
    initialState: sensorAdapter.getInitialState(),
    reducers: {
        // e.g., updateSensor: sensorAdapter.updateOne,
    },
    // Extra reducers для API (on fulfilled addMany/upsert)
});

export const sensorSelectors = sensorAdapter.getSelectors();
export default sensorSlice.reducer;