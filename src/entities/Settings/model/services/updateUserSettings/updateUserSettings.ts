import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { getUserAuthData } from 'entities/User';
import { AppLang, UserSettings } from 'entities/Settings/model/types/settings';
import { getSettingsForm } from 'entities/Settings/model/selectors/getSettingsForm/getSettingsForm';

import i18n from 'i18next';

export const updateUserSettings = createAsyncThunk<
    UserSettings,
    void,
    ThunkConfig<string>
>(
    'settings/updateUserSettings',
    async (_, thunkApi) => {
        const {
            extra, rejectWithValue, dispatch, getState,
        } = thunkApi;

        const userId = getUserAuthData(getState())?.id;
        const settingsForm = getSettingsForm(getState());

        try {
            const response = await extra.api.put<UserSettings>(`/userSettings/${userId}`, settingsForm);

            i18n.changeLanguage(response.data.lang);

            return response.data;
        } catch (e) {
            console.log(e);
            return rejectWithValue('error');
        }
    },
);
