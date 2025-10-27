import { ACTIONS } from '../actions';
import { SCOPES, type Rule } from '../engine';

export const ProfilePolicy: Readonly<Partial<Record<
    // перечисляем ТОЛЬКО допустимые actions для Settings
    | typeof ACTIONS.PROFILE_EDIT_START
    | typeof ACTIONS.PROFILE_EDIT_CANCEL
    | typeof ACTIONS.PROFILE_UPDATE,
    Rule
>>> = {
    [ACTIONS.PROFILE_EDIT_START]: { scope: SCOPES.OWN },
    [ACTIONS.PROFILE_EDIT_CANCEL]: { scope: SCOPES.OWN },
    [ACTIONS.PROFILE_UPDATE]: { scope: SCOPES.OWN },
} as const;
