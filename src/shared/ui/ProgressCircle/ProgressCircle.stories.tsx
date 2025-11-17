import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import ProgressCircle from './ProgressCircle';

export default {
    title: 'shared/ProgressCircle',
    component: ProgressCircle,
    argTypes: {
        backgroundColor: {control: 'color'},
    },
} as ComponentMeta<typeof ProgressCircle>;

const Template: ComponentStory<typeof ProgressCircle> = (args) => <ProgressCircle {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
