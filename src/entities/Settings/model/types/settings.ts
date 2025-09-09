import { Currency } from 'entities/Currency';
import { Theme } from 'shared/const/ThemeTypes';

export enum AppLang {
    RU = 'ru',
    EN = 'en',
}

export interface UserSettings {
    userId?: string;
    theme?: Theme;
    lang?: AppLang;
    currency?: Currency;
}

export interface SettingsSchema {
    readonly: boolean
    form?: UserSettings
    editBackup?: UserSettings // снапшот в момент "Edit"
}
