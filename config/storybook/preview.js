import { addDecorator } from '@storybook/react';
import { initialize, mswLoader } from 'msw-storybook-addon';
import { Theme } from '../../src/shared/const/ThemeTypes';
import { StyleDecorator } from '../../src/shared/config/storybook/StyleDecorator/StyleDecorator';
import { ThemeDecorator } from '../../src/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { RouterDecorator } from '../../src/shared/config/storybook/RouterDecorator/RouterDecorator';
import { SuspenseDecorator } from '../../src/shared/config/storybook/SuspenseDecorator/SuspenseDecorator';
import { handlers } from '../../src/shared/msw/handlers';

initialize({ onUnhandledRequest: 'warn' });

export const loaders = [mswLoader];
export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
        matchers: { color: /(background|color)$/i, date: /Date$/ },
    },
    msw: { handlers },
};

addDecorator(StyleDecorator);
addDecorator(ThemeDecorator(Theme.LIGHT));
addDecorator(RouterDecorator);
addDecorator(SuspenseDecorator);
