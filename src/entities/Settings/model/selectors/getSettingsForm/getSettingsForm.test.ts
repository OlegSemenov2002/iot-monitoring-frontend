// import { StateSchema } from 'app/providers/StoreProvider';
// import { AppLang } from 'entities/Settings/lib/types/settings';
// import { Theme } from 'shared/const/ThemeTypes';
// import { Currency } from 'entities/Currency';
// import { getSettingsForm } from './getSettingsForm';
//
// describe('getSettingsForm', () => {
//     test('should return correct form', () => {
//         const state: DeepPartial<StateSchema> = {
//             settings: {
//                 isLoading: false,
//                 data: {
//                     theme: Theme.LIGHT,
//                     lang: AppLang.EN,
//                     currency: Currency.RUB,
//                 },
//                 form: {
//                     theme: Theme.LIGHT,
//                     lang: AppLang.EN,
//                     currency: Currency.RUB,
//                 },
//                 readonly: true,
//             },
//         };
//         expect(getSettingsForm(state as StateSchema)).toEqual({
//             theme: Theme.LIGHT,
//             lang: AppLang.EN,
//             currency: Currency.RUB,
//         });
//     });
//
//     test('should return correct form 2 ', () => {
//         const state: DeepPartial<StateSchema> = {
//             settings: {
//                 isLoading: false,
//                 data: {
//
//                     theme: Theme.LIGHT,
//                     lang: AppLang.EN,
//                     currency: Currency.RUB,
//                 },
//                 form: {
//                     theme: Theme.DARK,
//                     lang: AppLang.EN,
//                     currency: Currency.RUB,
//                 },
//                 readonly: true,
//             },
//         };
//         expect(getSettingsForm(state as StateSchema)).toEqual({
//             theme: Theme.DARK,
//             lang: AppLang.EN,
//             currency: Currency.RUB,
//         });
//     });
//
//     test('should return undefined', () => {
//         const state: DeepPartial<StateSchema> = {
//             settings: {
//                 isLoading: false,
//                 error: 'error',
//                 readonly: true,
//             },
//         };
//         expect(getSettingsForm(state as StateSchema)).toBe(undefined);
//     });
//
//     test('should return not equal', () => {
//         const state: DeepPartial<StateSchema> = {
//             settings: {
//                 isLoading: false,
//                 data: {
//                     theme: Theme.LIGHT,
//                     lang: AppLang.EN,
//                     currency: Currency.RUB,
//                 },
//                 form: {
//                     theme: Theme.DARK,
//                     lang: AppLang.EN,
//                     currency: Currency.RUB,
//                 },
//                 readonly: true,
//             },
//         };
//         expect(getSettingsForm(state as StateSchema)).not.toEqual({
//             id: '2',
//             userId: '2',
//             theme: 'app_dark_theme',
//             lang: 'en',
//             currency: 'RUB',
//         });
//     });
// });
