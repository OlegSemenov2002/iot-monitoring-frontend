export const RESOURCES = {
    SETTINGS: 'Settings',
    PROFILE: 'Profile',
    ADMIN_PANEL: 'AdminPanel',
    SENSOR: 'Sensor',
} as const;
export type Resource = typeof RESOURCES[keyof typeof RESOURCES];

export const ACTIONS = {
    SETTINGS_EDIT_START: 'settings.edit.start',
    SETTINGS_EDIT_CANCEL: 'settings.edit.cancel',
    SETTINGS_UPDATE: 'settings.update',

    PROFILE_EDIT_START: 'profile.edit.start',
    PROFILE_EDIT_CANCEL: 'profile.edit.cancel',
    PROFILE_UPDATE: 'profile.update',

    SENSOR_EDIT_START: 'sensor.edit.start',
    SENSOR_EDIT_CANCEL: 'sensor.edit.cancel',
    SENSOR_UPDATE: 'sensor.update',
} as const;

export type Action = typeof ACTIONS[keyof typeof ACTIONS];
