// src/entities/Settings/testing/mswHandlers.ts
import { delay, http, HttpResponse } from 'msw';
import { AppLang, UserSettings } from 'entities/Settings/model/types/settings';
import { Theme } from 'shared/const/ThemeTypes';
import { Currency } from 'entities/Currency';

let rows: Array<Omit<UserSettings, 'userId'|'id'> & { userId: string; id: number }> = [
    {
        userId: '1', id: 1, theme: Theme.DARK, lang: AppLang.EN, currency: Currency.RUB,
    },
];

const byUser = (uid: string) => rows.findIndex((r) => String(r.userId) === String(uid));
export const resetSettingsDb = () => {
    rows = [{
        userId: '1', id: 1, theme: Theme.DARK, lang: AppLang.EN, currency: Currency.RUB,
    }];
};

export const settingsHandlers = [
    http.get('/userSettings/:userId', async ({ params }) => {
        await delay(120);
        const i = byUser(String(params.userId));
        if (i === -1) return HttpResponse.json({ message: 'Not found' }, { status: 404 });
        return HttpResponse.json(rows[i]);
    }),
    http.patch('/userSettings/:userId', async ({ params, request }) => {
        const uid = String(params.userId);
        const i = byUser(uid);
        if (i === -1) return HttpResponse.json({ message: 'Not found' }, { status: 404 });

        const patch = (await request.json()) as Partial<UserSettings>;
        if (patch.lang && !['en', 'ru', 'Russian'].includes(String(patch.lang))) {
            return HttpResponse.json({ message: 'Bad lang' }, { status: 400 });
        }
        rows[i] = {
            ...rows[i], ...patch, userId: uid, id: rows[i].id,
        };
        return HttpResponse.json(rows[i]);
    }),
];
