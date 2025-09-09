import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
// import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'shared/const/ThemeTypes';
import { ThemeSelect } from './ThemeSelect';

export default {
    title: 'entities/ThemeSelect',
    component: ThemeSelect,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ThemeSelect>;

const Template: ComponentStory<typeof ThemeSelect> = (args) => <ThemeSelect {...args} />;

export const Readonly = Template.bind({});
Readonly.args = {
    readonly: true,
};
Readonly.decorators = [StoreDecorator({})];

export const ReadonlyDark = Template.bind({});
ReadonlyDark.args = {
    readonly: true,
};

ReadonlyDark.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator({})];

export const Editing = Template.bind({});
Editing.args = {
    readonly: false,
};
Editing.decorators = [StoreDecorator({

})];

export const EditingDark = Template.bind({});
EditingDark.args = {
    readonly: false,
};

EditingDark.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator({})];
