import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {ScrollableRecentList} from './ScrollableRecentList';

export default {
    title: 'shared/ScrollableRecentList',
    component: ScrollableRecentList,
    argTypes: {
        backgroundColor: {control: 'color'},
    },
} as ComponentMeta<typeof ScrollableRecentList>;

const Template: ComponentStory<typeof ScrollableRecentList> = (args) => < ScrollableRecentList {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
