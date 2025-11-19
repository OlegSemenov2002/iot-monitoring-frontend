import { lazy } from 'react';

export const SensorsListPageAsync = lazy(() => new Promise((resolve) => {
    // @ts-ignore
    resolve(import('./SensorsListPage'));
}));
