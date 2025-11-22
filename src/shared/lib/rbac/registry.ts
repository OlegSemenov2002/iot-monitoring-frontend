import { UserRole } from 'entities/User';
import { ProfilePolicy } from 'shared/lib/rbac/policies/Profile.policy';
import { RESOURCES, ACTIONS } from './actions';
import { SCOPES, type RBACMatrix } from './engine';
import { SettingsPolicy } from './policies/Settings.policy';

export const RBAC: RBACMatrix = {
    [UserRole.GUEST]: {
        [RESOURCES.SETTINGS]: {},
        [RESOURCES.PROFILE]: {},
        [RESOURCES.SENSOR]: {},
    },

    [UserRole.USER]: {
        [RESOURCES.SETTINGS]: SettingsPolicy,
        [RESOURCES.PROFILE]: ProfilePolicy,
        [RESOURCES.SENSOR]: {},
    },

    [UserRole.MANAGER]: {
        [RESOURCES.SETTINGS]: SettingsPolicy,
        [RESOURCES.PROFILE]: ProfilePolicy,
        [RESOURCES.SENSOR]: {},
    },

    [UserRole.ADMIN]: {
        [RESOURCES.SETTINGS]: {
            ...SettingsPolicy,
            [ACTIONS.SETTINGS_EDIT_START]: { scope: SCOPES.ANY },
            [ACTIONS.SETTINGS_EDIT_CANCEL]: { scope: SCOPES.ANY },
            [ACTIONS.SETTINGS_UPDATE]: { scope: SCOPES.ANY },
        },
        [RESOURCES.PROFILE]: {
            ...ProfilePolicy,
            [ACTIONS.PROFILE_EDIT_START]: { scope: SCOPES.ANY },
            [ACTIONS.PROFILE_EDIT_CANCEL]: { scope: SCOPES.ANY },
            [ACTIONS.PROFILE_UPDATE]: { scope: SCOPES.ANY },
        },
        [RESOURCES.SENSOR]: {
            [ACTIONS.SENSOR_EDIT_START]: { scope: SCOPES.ANY },
            [ACTIONS.SENSOR_EDIT_CANCEL]: { scope: SCOPES.ANY },
            [ACTIONS.SENSOR_UPDATE]: { scope: SCOPES.ANY },
        },
    },
} as const;
