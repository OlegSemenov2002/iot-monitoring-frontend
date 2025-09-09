// import { StateSchema } from 'app/providers/StoreProvider';
// import { getSettingsReadonly } from './getSettingsReadonly';
//
// describe('getSettingsReadonly', () => {
//     test('should return loading is true', () => {
//         const state: DeepPartial<StateSchema> = {
//             settings: {
//
//                 readonly: true,
//             },
//         };
//         expect(getSettingsReadonly(state as StateSchema)).toBe(true);
//     });
//
//     test('should return loading is false', () => {
//         const state: DeepPartial<StateSchema> = {
//             settings: {
//
//                 readonly: false,
//             },
//         };
//         expect(getSettingsReadonly(state as StateSchema)).toBe(false);
//     });
//
//     test('should return undefined', () => {
//         const state: DeepPartial<StateSchema> = {
//             settings: {
//                 error: 'error',
//             },
//         };
//         expect(getSettingsReadonly(state as StateSchema)).toBe(undefined);
//     });
// });
