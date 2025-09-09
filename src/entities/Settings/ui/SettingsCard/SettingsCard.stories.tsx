// import React from 'react';
// import { ComponentMeta, ComponentStory } from '@storybook/react';
// // import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
// import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
// import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
// import { Theme } from 'shared/const/ThemeTypes';
// import { SettingsCard } from './SettingsCard';
//
// export default {
//     title: 'entities/SettingsCard',
//     component: SettingsCard,
//     argTypes: {
//         backgroundColor: { control: 'color' },
//     },
// } as ComponentMeta<typeof SettingsCard>;
//
// const Template: ComponentStory<typeof SettingsCard> = (args) => <SettingsCard {...args} />;
//
// export const Readonly = Template.bind({});
// Readonly.args = {
//     readonly: true,
// };
//
// Readonly.decorators = [StoreDecorator({})];
//
// export const ReadonlyDark = Template.bind({});
// ReadonlyDark.args = {
//
// };
//
// ReadonlyDark.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator({})];
//
// export const Editing = Template.bind({});
// Editing.args = {};
// Editing.decorators = [StoreDecorator({})];
//
// export const EditingDark = Template.bind({});
// EditingDark.args = {};
// EditingDark.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator({})];
//
// export const Loading = Template.bind({});
// Loading.args = {};
// Loading.decorators = [StoreDecorator({
//     settings: {
//         isLoading: true,
//     },
// })];
//
// export const LoadingDark = Template.bind({});
// LoadingDark.args = {};
// LoadingDark.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator({
//     settings: {
//         isLoading: true,
//     },
// })];
//
// export const Error = Template.bind({});
// Error.args = {};
// Error.decorators = [StoreDecorator({
//     settings: {
//         error: 'Error',
//     },
// })];
//
// export const ErrorDark = Template.bind({});
// ErrorDark.args = {};
// ErrorDark.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator({
//     settings: {
//         error: 'Error',
//     },
// })];
