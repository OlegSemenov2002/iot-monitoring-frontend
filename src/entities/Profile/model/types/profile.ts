import { Currency } from 'entities/Currency/model/types/currency';
import { Country } from 'entities/Country/model/types/country';
import { SettingsSchema } from 'entities/Settings';

export interface Profile {
    first?: string;
    lastname?: string;
    age?: number,
    currency?: Currency,
    country?: Country;
    city?: string,
    username?: string;
    avatar?: string;
    position?: string;
}

export interface ProfileSchema {
    readonly: boolean,
    form?: Profile,
    editBackup?: Profile,
}
