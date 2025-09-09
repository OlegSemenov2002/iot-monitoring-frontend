import { StateSchema } from 'app/providers/StoreProvider';

export const getProfileEditBackup = (state: StateSchema) => state.profile?.editBackup;
