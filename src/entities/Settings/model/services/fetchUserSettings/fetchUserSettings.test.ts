import { userActions } from 'entities/User';
import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { I18N_LOCALSTORAGE_KEY, LOCAL_STORAGE_THEME_KEY } from 'shared/const/localstorage';
import { Theme } from 'shared/const/ThemeTypes';
import { AppLang } from 'entities/Settings/model/types/settings';
import { Currency } from 'entities/Currency';
import { settingsActions } from 'entities/Settings';
import i18n from 'i18next';
import { fetchUserSettings } from './fetchUserSettings';

jest.mock('i18next', () => ({
    changeLanguage: jest.fn(),
}));

afterEach(() => jest.clearAllMocks());

describe('fetchUserSettings.test', () => {
    test('success fetch settings (GET branch)', async () => {
        const userValue = {
            theme: 'app_light_theme',
            lang: 'en',
            currency: 'RUB',
        };

        const thunk = new TestAsyncThunk(fetchUserSettings);
        thunk.api.get.mockReturnValue(Promise.resolve({ data: userValue }));
        const result = await thunk.callThunk({
            userId: '1',
            fallback: {
                theme: (localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme) ?? Theme.DARK,
                lang: (localStorage.getItem(I18N_LOCALSTORAGE_KEY) as AppLang) ?? AppLang.RU,
                currency: Currency.RUB, // или свой дефолт/чтение из LS, если храните
            },
        });

        // следим за вызовом changeLanguage
        const changeLangSpy = jest
            .spyOn(i18n, 'changeLanguage')
            .mockResolvedValue(undefined as any);

        expect(thunk.api.get).toHaveBeenCalledWith('/userSettings/1');
        expect(thunk.api.post).not.toHaveBeenCalled();
        expect(changeLangSpy).toHaveBeenCalledWith('en');
        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result.payload).toEqual(userValue);
    });

    test('GET 404 -> create via POST (POST branch)', async () => {
        const fallback = { theme: 'app_light_theme', lang: 'en', currency: 'RUB' };
        const created = { id: '1', userId: '1', ...fallback };

        const thunk = new TestAsyncThunk(fetchUserSettings);
        thunk.api.get.mockRejectedValue({ response: { status: 404 } });
        thunk.api.post.mockResolvedValue({ data: created });

        const result = await thunk.callThunk({ userId: '1', ...fallback });

        // следим за вызовом changeLanguage
        const changeLangSpy = jest
            .spyOn(i18n, 'changeLanguage')
            .mockResolvedValue(undefined as any);

        expect(thunk.api.get).toHaveBeenCalled();
        expect(thunk.api.post).toHaveBeenCalledWith('/userSettings', created);
        expect(changeLangSpy).not.toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe('fulfilled');
        expect(result.payload).toEqual(created);
    });
});
