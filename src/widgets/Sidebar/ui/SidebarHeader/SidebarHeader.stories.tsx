import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {SidebarHeader} from './SidebarHeader';


export default {
    title: 'shared/SidebarHeader',
    component: SidebarHeader,
    argTypes: {
        backgroundColor: {control: 'color'},
    },
} as ComponentMeta<typeof SidebarHeader>;

const Template: ComponentStory<typeof SidebarHeader> = (args) => <SidebarHeader {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
