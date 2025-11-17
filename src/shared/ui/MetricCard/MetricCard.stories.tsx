import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {MetricCard} from './MetricCard';

export default {
    title: 'shared/MetricCard',
    component: MetricCard,
    argTypes: {
        backgroundColor: {control: 'color'},
    },
} as ComponentMeta<typeof MetricCard>;

const Template: ComponentStory<typeof MetricCard> = (args) => < MetricCard {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
