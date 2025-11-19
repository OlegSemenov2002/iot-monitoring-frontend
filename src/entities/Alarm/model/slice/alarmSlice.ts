import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { alarmApi } from 'shared/api/alarmApi';
import type { Alarm } from '../types/Alarm';

const alarmAdapter = createEntityAdapter<Alarm>({
    selectId: (alarm) => alarm.id,
    sortComparer: (a, b) => a.date_time.localeCompare(b.date_time),
});

const alarmSlice = createSlice({
    name: 'alarm',
    initialState: alarmAdapter.getInitialState(),
    reducers: {

        updateAlarm: alarmAdapter.updateOne,
        addAlarm: alarmAdapter.addOne,
        removeAlarm: alarmAdapter.removeOne,
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            alarmApi.endpoints.getLastAlarmsByDeviceId.matchFulfilled,
            (state, action) => {
                alarmAdapter.setAll(state, action.payload);
            }
        );
    },
});

export const {
    selectAll: selectAllAlarms,
    selectById: selectAlarmById,
} = alarmAdapter.getSelectors((state: any) => state.alarm);

export const { updateAlarm, addAlarm, removeAlarm } = alarmSlice.actions;
