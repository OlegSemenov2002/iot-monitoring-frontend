import { lazy } from 'react';

export const SensorDetailsPageAsync = lazy(() => new Promise((resolve) => {
    // @ts-ignore
    setTimeout(() => resolve(import('./SensorDetailsPage')), );
}));
