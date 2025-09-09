import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SettingsSchema, UserSettings } from '../types/settings';

const initialState: SettingsSchema = {
    readonly: true,
    form: undefined,
    editBackup: undefined,
};

export const settingSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        startEdit(state) {
            state.readonly = false;
            state.editBackup = state.form ? { ...state.form } : undefined;
        },
        cancelEdit(state) {
            state.readonly = true;
            state.form = state.editBackup ? { ...state.editBackup } : state.form;
            state.editBackup = undefined;
        },
        setForm(state, action: PayloadAction<Partial<UserSettings>>) {
            state.form = { ...state.form, ...action.payload };
        },
        saveDone(state) {
            state.readonly = true;
            state.editBackup = undefined;
        },
    },
});

// Action creators are generated for each case reducer function
export const { actions: settingsActions } = settingSlice;
export const { reducer: settingsReducer } = settingSlice;
