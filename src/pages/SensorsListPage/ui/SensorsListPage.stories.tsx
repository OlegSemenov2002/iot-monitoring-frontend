import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'shared/const/ThemeTypes';
import SensorsListPage from './SensorsListPage';

export default {
    title: 'pages/SensorDetailsPage',
    component: SensorsListPage,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof SensorsListPage>;

const Template: ComponentStory<typeof SensorsListPage> = () => <SensorsListPage />;

export const Normal = Template.bind({});
Normal.args = {};

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK)];
