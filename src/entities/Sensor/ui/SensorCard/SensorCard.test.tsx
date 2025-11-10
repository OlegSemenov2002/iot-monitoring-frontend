// import { render, screen } from '@testing-library/react';
// import { Button, ButtonTheme } from 'shared/ui/Button/Button';
// import {SENSOR_CARD_VIEWS, SensorCard} from './SensorCard';
// import {DeepPartial} from "@reduxjs/toolkit";
// import {Sensor} from "entities/Sensor/model/types/sensor";
//
//
// const sensor: Sensor = {
//     auto_added: 1,
//     battery: 96,
//     description: 'Олег ЧС 2-7',
//     device_eui: '373536335c317f13',
//     first_act: '2025-01-14 19:52:58',
//     id: 6,
//     last_act: '2025-02-07 09:55:33',
//     last_gateway_id: 7,
//     notify_loss: 0,
//     notify: 0,
//     security_user_id: 1,
//     type: 1,
// };
//
//
// describe('SensorCard', () => {
//     test('Test minimal sensor card render correct ', () => {
//         render(<SensorCard sensor={sensor} view={SENSOR_CARD_VIEWS.MINIMAL}/>);
//         expect(screen.getByText(/Олег ЧС 2-7/)).toBeInTheDocument();
//         expect(screen.queryByText('Lact Activity')).not.toBeInTheDocument();
//     });
//
//     test('Test full sensor card render', () => {
//         render(<SensorCard sensor={sensor} view={SENSOR_CARD_VIEWS.FULL}/>);
//         expect(screen.getByText(/Олег ЧС 2-7/)).toBeInTheDocument();
//         expect(screen.getByText(/Last Activity/i)).toBeInTheDocument();
//
//     });
// });
