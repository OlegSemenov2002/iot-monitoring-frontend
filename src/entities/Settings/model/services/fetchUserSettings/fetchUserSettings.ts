import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ThunkConfig } from 'app/providers/StoreProvider';
import i18n from 'i18next';
import type { UserSettings } from '../../types/settings';

// Аргументом передаём userId и fallback-значения на случай 404
type Args = {
    userId: string;
    fallback?: Pick<UserSettings, 'theme' | 'lang' | 'currency'>;
};
const fallback = { theme: 'app_light_theme', lang: 'en', currency: 'RUB' };
export const fetchUserSettings = createAsyncThunk<
    UserSettings,
    Args,
    ThunkConfig<string>
>(
    'settings/fetchUserSettings',
    async (
        { userId, fallback = { theme: 'app_light_theme', lang: 'en', currency: 'RUB' } },
        { extra, rejectWithValue },
    ) => {
        try {
            const res = await extra.api.get<UserSettings>(`/userSettings/${userId}`);
            i18n.changeLanguage(res.data.lang);

            return res.data;
        } catch (err: any) {
            const status = err?.response?.status;

            // если нет записи — создаём с переданными fallback-значениями
            if (status === 404) {
                try {
                    const createRes = await extra.api.post<UserSettings>('/userSettings', {
                        id: userId,
                        userId,
                        ...fallback,
                    });

                    return createRes.data;
                } catch {
                    return rejectWithValue('error');
                }
            }

            return rejectWithValue('error');
        }
    },
);
