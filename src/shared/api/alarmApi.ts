import { rtkApi } from 'shared/api/rtkApi';
import { Sensor, SensorAlarm, SensorConfig } from 'entities/Sensor/model/types/sensor';

export const alarmApi = rtkApi
    .enhanceEndpoints({ addTagTypes: ['Alarms', 'Sensors', 'Config'] })
    .injectEndpoints({
        endpoints: (build) => ({
            getLastAlarmsByDeviceId: build.query({
                query: ({ deviceId, n }) => ({
                    url: '/alarms',
                    params: {
                        device_id: deviceId,
                        _sort: 'date_time',
                        _order: 'desc',
                        _limit: n,
                    },
                }),
            }),
        }),
    });

export const {
    useGetLastAlarmsByDeviceIdQuery,
} = alarmApi;
