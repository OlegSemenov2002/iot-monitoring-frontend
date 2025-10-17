
import { rtkApi } from 'shared/api/rtkApi';
import { Sensor, SensorAlarm, SensorConfig } from 'entities/Sensor/model/types/sensor';

export const sensorApi = rtkApi
    .enhanceEndpoints({ addTagTypes: ['Sensor'] })
    .injectEndpoints({
        endpoints: (build) => ({
            updateSensorNotify: build.mutation<Sensor, { sensorId: number; notifyStatus: number }>({
                query: ({ sensorId, notifyStatus }) => ({
                    url: `/devices/${sensorId}`,
                    method: 'PATCH',
                    body: { notify: notifyStatus },
                }),
                invalidatesTags: (result, error, { sensorId }) => [{ type: 'Sensor', id: sensorId }],
            }),

        }),
    });

export const {

    useUpdateSensorNotifyMutation,
} = sensorApi;
