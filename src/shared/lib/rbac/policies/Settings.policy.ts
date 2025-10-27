import { ACTIONS } from '../actions';
import { SCOPES, type Rule } from '../engine';

export const SettingsPolicy: Readonly<Partial<Record<
    // перечисляем ТОЛЬКО допустимые actions для Settings
    | typeof ACTIONS.SETTINGS_EDIT_START
    | typeof ACTIONS.SETTINGS_EDIT_CANCEL
    | typeof ACTIONS.SETTINGS_UPDATE,
    Rule
>>> = {
    [ACTIONS.SETTINGS_EDIT_START]: { scope: SCOPES.OWN },
    [ACTIONS.SETTINGS_EDIT_CANCEL]: { scope: SCOPES.OWN },
    [ACTIONS.SETTINGS_UPDATE]: { scope: SCOPES.OWN },
} as const;
