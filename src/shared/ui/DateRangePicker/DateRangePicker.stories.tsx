import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {DateRangePicker} from './DateRangePicker';

export default {
    title: 'shared/DateRangePicker',
    component: DateRangePicker,
    argTypes: {
        backgroundColor: {control: 'color'},
    },
} as ComponentMeta<typeof DateRangePicker>;

const Template: ComponentStory<typeof DateRangePicker> = (args) => < DateRangePicker {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
