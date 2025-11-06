import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from 'shared/const/ThemeTypes';
import {SENSOR_CARD_VIEWS, SensorCard} from './SensorCard';

export default {
    title: 'shared/SensorCard',
    component: SensorCard,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof SensorCard>;

const Template: ComponentStory<typeof SensorCard> = (args) => <SensorCard {...args} />;

// export const Primary = Template.bind({});
// Primary.args = {
//     title: 'Title lorem ipsun',
//     text: 'Description Description Description Description',
// };
//
// export const Error = Template.bind({});
// Error.args = {
//     title: 'Title lorem ipsun',
//     text: 'Description Description Description Description',
//     theme: TextTheme.ERROR,
// };
// onlyTextDark.decorators = [ThemeDecorator(Theme.DARK)];

export const FullCard = Template.bind({});
FullCard.args = {
    view: SENSOR_CARD_VIEWS.FULL,
    sensor: {
        auto_added: 1,
        battery: 96,
        description: 'Олег ЧС 2-7',
        device_eui: '373536335c317f13',
        first_act: '2025-01-14 19:52:58',
        id: 6,
        last_act: '2025-02-07 09:55:33',
        last_gateway_id: 7,
        notify_loss: 0,
        notify: 0,
        security_user_id: 1,
        type: 1,
    },
};

export const CompactCard = Template.bind({});
CompactCard.args = {
    view: SENSOR_CARD_VIEWS.COMPACT,
    sensor: {
        auto_added: 1,
        battery: 96,
        description: 'Олег ЧС 2-7',
        device_eui: '373536335c317f13',
        first_act: '2025-01-14 19:52:58',
        id: 6,
        last_act: '2025-02-07 09:55:33',
        last_gateway_id: 7,
        notify_loss: 0,
        notify: 0,
        security_user_id: 1,
        type: 1,
    },
};


export const MinimalCard = Template.bind({});
MinimalCard.args = {
    view: SENSOR_CARD_VIEWS.MINIMAL,
    sensor: {
        auto_added: 1,
        battery: 96,
        description: 'Олег ЧС 2-7',
        device_eui: '373536335c317f13',
        first_act: '2025-01-14 19:52:58',
        id: 6,
        last_act: '2025-02-07 09:55:33',
        last_gateway_id: 7,
        notify_loss: 0,
        notify: 0,
        security_user_id: 1,
        type: 1,
    },
};


