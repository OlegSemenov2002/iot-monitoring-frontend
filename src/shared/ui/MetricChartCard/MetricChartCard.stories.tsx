import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {MetricChartCard} from './MetricChartCard';

export default {
    title: 'shared/MetricChartCard',
    component: MetricChartCard,
    argTypes: {
        backgroundColor: {control: 'color'},
    },
} as ComponentMeta<typeof MetricChartCard>;

const Template: ComponentStory<typeof MetricChartCard> = (args) => < MetricChartCard {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
