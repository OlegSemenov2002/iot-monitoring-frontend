// import { settingsActions, settingsReducer } from './settingsSlice';
// import { Currency } from '../../../../entities/Currency';
// import { Theme } from '../../../../shared/const/ThemeTypes';
// import { AppLang, SettingsSchema } from '../types/settings';
//
// describe('settingsSlice.test', () => {
//     test('set readonly to settings true', () => {
//         const state: SettingsSchema = {
//             isLoading: false,
//             data: {
//
//                 userId: '1',
//                 theme: Theme.LIGHT,
//                 lang: AppLang.RU,
//                 currency: Currency.RUB,
//             },
//             form: {
//                 theme: Theme.LIGHT,
//                 lang: AppLang.RU,
//                 currency: Currency.RUB,
//             },
//             readonly: false,
//         };
//
//         expect(
//             settingsReducer(state, settingsActions.saveDone()),
//         ).toEqual({
//             isLoading: false,
//             data: {
//
//                 userId: '1',
//                 theme: Theme.LIGHT,
//                 lang: AppLang.RU,
//                 currency: Currency.RUB,
//             },
//             form: {
//                 theme: Theme.LIGHT,
//                 lang: AppLang.RU,
//                 currency: Currency.RUB,
//             },
//             readonly: true,
//         });
//     });
//
//     test('set readonly to settings false', () => {
//         const state: SettingsSchema = {
//             isLoading: false,
//             data: {
//
//                 userId: '1',
//                 theme: Theme.LIGHT,
//                 lang: AppLang.RU,
//                 currency: Currency.RUB,
//             },
//             form: {
//                 theme: Theme.LIGHT,
//                 lang: AppLang.RU,
//                 currency: Currency.RUB,
//             },
//             readonly: false,
//         };
//
//         expect(
//             settingsReducer(state, settingsActions.saveDone()),
//         ).toEqual({
//             isLoading: false,
//             data: {
//
//                 userId: '1',
//                 theme: Theme.LIGHT,
//                 lang: AppLang.RU,
//                 currency: Currency.RUB,
//             },
//             form: {
//                 theme: Theme.LIGHT,
//                 lang: AppLang.RU,
//                 currency: Currency.RUB,
//             },
//             readonly: false,
//         });
//     });
//
//     test('cancel edit 1', () => {
//         const state: SettingsSchema = {
//             isLoading: false,
//             data: {
//                 theme: Theme.LIGHT,
//                 lang: AppLang.RU,
//                 currency: Currency.RUB,
//             },
//             form: {
//                 theme: Theme.DARK,
//                 lang: AppLang.EN,
//                 currency: Currency.EUR,
//             },
//             readonly: false,
//         };
//         expect(
//             settingsReducer(state, settingsActions.cancelEdit()),
//         ).toEqual({
//             isLoading: false,
//             data: {
//                 theme: Theme.LIGHT,
//                 lang: AppLang.RU,
//                 currency: Currency.RUB,
//             },
//             form: {
//                 theme: Theme.LIGHT,
//                 lang: AppLang.RU,
//                 currency: Currency.RUB,
//             },
//             readonly: true,
//         });
//     });
//
//     test('cancel edit 2', () => {
//         const state: SettingsSchema = {
//             isLoading: false,
//             data: {
//                 theme: Theme.LIGHT,
//                 lang: AppLang.RU,
//                 currency: Currency.RUB,
//             },
//             form: {
//                 theme: Theme.DARK,
//                 lang: AppLang.RU,
//                 currency: Currency.RUB,
//             },
//             readonly: false,
//         };
//
//         expect(
//             settingsReducer(state, settingsActions.cancelEdit()),
//         ).toEqual({
//             isLoading: false,
//             data: {
//                 theme: Theme.LIGHT,
//                 lang: AppLang.RU,
//                 currency: Currency.RUB,
//             },
//             form: {
//                 theme: Theme.LIGHT,
//                 lang: AppLang.RU,
//                 currency: Currency.RUB,
//             },
//             readonly: true,
//         });
//     });
//
//     test('update settings 1', () => {
//         const state: SettingsSchema = {
//             isLoading: false,
//             data: {
//                 theme: Theme.LIGHT,
//                 lang: AppLang.RU,
//                 currency: Currency.RUB,
//             },
//             form: {
//                 theme: Theme.LIGHT,
//                 lang: AppLang.RU,
//                 currency: Currency.RUB,
//             },
//             readonly: false,
//         };
//
//         expect(
//             settingsReducer(state, settingsActions.setForm({
//                 theme: Theme.DARK,
//             })),
//         ).toEqual({
//             isLoading: false,
//             data: {
//                 theme: Theme.LIGHT,
//                 lang: AppLang.RU,
//                 currency: Currency.RUB,
//             },
//             form: {
//                 theme: Theme.DARK,
//                 lang: AppLang.RU,
//                 currency: Currency.RUB,
//             },
//             readonly: false,
//         });
//     });
//
//     test('update settings 2', () => {
//         const state: SettingsSchema = {
//             isLoading: false,
//             data: {
//                 theme: Theme.LIGHT,
//                 lang: AppLang.EN,
//                 currency: Currency.EUR,
//             },
//             form: {
//                 theme: Theme.DARK,
//                 lang: AppLang.EN,
//                 currency: Currency.RUB,
//             },
//             readonly: false,
//         };
//
//         expect(
//             settingsReducer(state, settingsActions.setForm({
//                 theme: Theme.DARK,
//                 lang: AppLang.EN,
//                 currency: Currency.RUB,
//             })),
//         ).toEqual({
//             isLoading: false,
//             data: {
//                 theme: Theme.LIGHT,
//                 lang: AppLang.EN,
//                 currency: Currency.EUR,
//             },
//             form: {
//                 theme: Theme.DARK,
//                 lang: AppLang.EN,
//                 currency: Currency.RUB,
//             },
//             readonly: false,
//         });
//     });
// });
