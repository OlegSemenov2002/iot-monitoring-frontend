import { userActions } from 'entities/User';
import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { I18N_LOCALSTORAGE_KEY, LOCAL_STORAGE_THEME_KEY } from 'shared/const/localstorage';
import { Theme } from 'shared/const/ThemeTypes';
import { AppLang } from 'entities/Settings/model/types/settings';
import { Currency } from 'entities/Currency';
import { settingsActions } from 'entities/Settings';
import i18n from 'i18next';
import { StateSchema } from 'app/providers/StoreProvider';
import { updateUserSettings } from './updateUserSettings';

jest.mock('i18next', () => ({
    changeLanguage: jest.fn(),
}));

afterEach(() => jest.clearAllMocks());

describe('updateUserSettings.test', () => {
    test('success update settings (GET branch)', async () => {
        const initialState: DeepPartial<StateSchema> = {
            settings: {
                form: { theme: Theme.LIGHT, lang: AppLang.EN, currency: Currency.RUB },
            },
            user: { authData: { id: '1', username: 'u' } }, // если нужно для запроса
        };

        const thunk = new TestAsyncThunk(updateUserSettings, initialState);

        // мок запроса
        thunk.api.put.mockResolvedValue({ data: { id: '1', userId: '1', ...initialState.settings!.form! } });

        // если аргументов нет — вызываем без них
        const result = await thunk.callThunk();

        expect(thunk.api.put).toHaveBeenCalled();
        expect(result.meta.requestStatus).toBe('fulfilled');
    });
});
