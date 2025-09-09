import { StateSchema } from 'app/providers/StoreProvider';

export const getSettingsReadonly = (state: StateSchema) => state.settings?.readonly;
