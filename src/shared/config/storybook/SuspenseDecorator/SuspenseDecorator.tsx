import React, { Suspense } from 'react';

export const SuspenseDecorator = (Story: React.FC) => (
    <Suspense fallback={<div />}>
        <Story />
    </Suspense>
);
