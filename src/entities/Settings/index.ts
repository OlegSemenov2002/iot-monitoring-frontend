export {
    settingsActions,
    settingsReducer,

} from './model/slice/settingsSlice';

export { SettingsCard } from './ui/SettingsCard/SettingsCard';
export { ThemeSelect } from './ui/ThemeSelect/ThemeSelect';
export { LangSelect } from './ui/LangSelect/LangSelect';

export { getSettingsForm } from './model/selectors/getSettingsForm/getSettingsForm';

export { getSettingsReadonly } from './model/selectors/getSettingsReadonly/getSettingsReadonly';
export {
    SettingsSchema,
} from './model/types/settings';

export {
    useGetSettingsDataQuery, useCreateSettingsMutation, useUpdateSettingsMutation, settingsApi,
} from './api/settingsApi';
