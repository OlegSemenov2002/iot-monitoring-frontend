export const RESOURCES = {
    SETTINGS: 'Settings',
    PROFILE: 'Profile',
    ADMIN_PANEL: 'AdminPanel',
} as const;
export type Resource = typeof RESOURCES[keyof typeof RESOURCES];

export const ACTIONS = {
    // settings
    SETTINGS_EDIT_START: 'settings.edit.start',
    SETTINGS_EDIT_CANCEL: 'settings.edit.cancel',
    SETTINGS_UPDATE: 'settings.update',

    // profile
    PROFILE_EDIT_START: 'profile.edit.start',
    PROFILE_EDIT_CANCEL: 'profile.edit.cancel',
    PROFILE_UPDATE: 'profile.update',

} as const;

export type Action = typeof ACTIONS[keyof typeof ACTIONS];
