import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'shared/const/ThemeTypes';
import { LangSelect } from './LangSelect';

export default {
    title: 'entities/LangSelect',
    component: LangSelect,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof LangSelect>;

const Template: ComponentStory<typeof LangSelect> = (args) => <LangSelect {...args} />;

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
