import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
// import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'shared/const/ThemeTypes';
import { SettingsPage } from 'pages/SettingsPage';
import { AppLang } from 'entities/Settings/model/types/settings';
import { Currency } from 'entities/Currency';
import { http, HttpResponse } from 'msw';

export default {
    title: 'pages/SettingsPage',
    component: SettingsPage,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof SettingsPage>;

const Template: ComponentStory<typeof SettingsPage> = (args) => <SettingsPage {...args} />;

export const Normal = Template.bind({});
Normal.args = {};

Normal.decorators = [
    StoreDecorator({
        user: {
            authData: { id: '1', username: 'admin' },
        },

    }),
];

export const ServerError = Template.bind({});
ServerError.args = {};
ServerError.decorators = [
    StoreDecorator({
        user: {
            authData: { id: '1', username: 'admin' },
        },
    }),
];
ServerError.parameters = {
    msw: {
        handlers: [

            http.get('/userSettings/:userId', () => HttpResponse.json({ message: 'Server error' }, { status: 500 })),
        ],
    },
};

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator({})];
