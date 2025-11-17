import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {ScrollableContainer} from './ScrollableContainer';

export default {
    title: 'shared/ScrollableContainer',
    component: ScrollableContainer,
    argTypes: {
        backgroundColor: {control: 'color'},
    },
} as ComponentMeta<typeof ScrollableContainer>;

const Template: ComponentStory<typeof ScrollableContainer> = (args) => < ScrollableContainer {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
