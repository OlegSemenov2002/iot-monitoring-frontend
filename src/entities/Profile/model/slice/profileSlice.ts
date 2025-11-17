import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserSettings } from 'entities/Settings/model/types/settings';
import { Profile, ProfileSchema } from '../types/profile';


const initialState: ProfileSchema = {
    readonly: true,
    form: undefined,
    editBackup: undefined,
};

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        startEdit(state) {
            state.readonly = false;
            state.editBackup = state.form ? { ...state.form } : undefined;
        },
        cancelEdit: (state) => {
            state.readonly = true;
            state.form = state.editBackup ? { ...state.editBackup } : state.form;
            state.editBackup = undefined;
        },
        setForm(state, action: PayloadAction<Partial<Profile>>) {
            state.form = { ...state.form, ...action.payload };
        },

        saveDone(state) {
            state.readonly = true;
            state.editBackup = undefined;
        },
    },

});

export const { actions: profileActions } = profileSlice;
export const { reducer: profileReducer } = profileSlice;
