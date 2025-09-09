import { StateSchema } from 'app/providers/StoreProvider';

export const getSettingsForm = (state: StateSchema) => state.settings?.form;
