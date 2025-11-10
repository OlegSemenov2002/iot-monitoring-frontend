// shared/api/sensorApi.ts (API для списка)
import { rtkApi } from 'shared/api/rtkApi';
import { Sensor, SensorAlarm, SensorConfig } from 'entities/Sensor/model/types/sensor';
export const sensorApi = rtkApi
    .enhanceEndpoints({ addTagTypes: ['Alarms', 'Sensors', 'Sensor', 'Config'] })
    .injectEndpoints({
        endpoints: (build) => ({
            // Получение одного сенсора
            getSensor: build.query<Sensor, number>({
                query: (sensorId) => `/devices/${sensorId}`,
                providesTags: (result, error, sensorId) => [{ type: 'Sensor', id: sensorId }],
            }),

            // Получение всех сенсоров (например для списка)
            getSensors: build.query<Sensor[], void>({
                query: () => `/devices`,
                providesTags: (result) =>
                    result
                        ? [...result.map((s) => ({ type: 'Sensor' as const, id: s.id }))]
                        : [],
            }),

            // Обновление сенсора
            updateSensor: build.mutation<Sensor, { deviceId: number; data: Partial<Sensor> }>({
                query: ({ deviceId, data }) => ({
                    url: `/devices/${deviceId}`,
                    method: 'PATCH',
                    body: data,
                }),
                invalidatesTags: (result, error, { deviceId }) => [{ type: 'Sensor', id: deviceId }],
            }),

            updateSensorNotify: build.mutation<Sensor, { sensorId: number; notifyStatus: number }>({
                query: ({ sensorId, notifyStatus }) => ({
                    url: `/devices/${sensorId}`,
                    method: 'PATCH',
                    body: { notify: notifyStatus },
                }),
                async onQueryStarted({ sensorId, notifyStatus }, { dispatch, queryFulfilled }) {
                    const patchResult = dispatch(
                        sensorApi.util.updateQueryData('getSensors', undefined, (draft) => {
                            const sensor = draft.find((s) => s.id === sensorId);
                            if (sensor) sensor.notify = notifyStatus;
                        })
                    );
                    try {
                        const { data } = await queryFulfilled;
                        dispatch(
                            sensorApi.util.updateQueryData('getSensors', undefined, (draft) => {
                                const index = draft.findIndex((s) => s.id === sensorId);
                                if (index !== -1) draft[index] = data;
                            })
                        );
                    } catch {
                        patchResult.undo();
                    }
                },
            }),

            // Аллерты и конфиг
            getSensorAlarms: build.query<SensorAlarm[], number>({
                query: (deviceId) => `/devices/${deviceId}/alarms`,
                providesTags: ['Alarms'],
            }),
            getSensorConfig: build.query<SensorConfig, number>({
                query: (deviceId) => `/devices/${deviceId}/config`,
                providesTags: ['Config'],
            }),
            updateSensorConfig: build.mutation<SensorConfig, { deviceId: number; config: Partial<SensorConfig> }>({
                query: ({ deviceId, config }) => ({
                    url: `/devices/${deviceId}/config`,
                    method: 'PATCH',
                    body: config,
                }),
                invalidatesTags: ['Config'],
                async onQueryStarted({ deviceId, config }, { dispatch, queryFulfilled }) {
                    const patch = dispatch(sensorApi.util.updateQueryData('getSensorConfig', deviceId, (draft) => {
                        Object.assign(draft, config);
                    }));
                    try { await queryFulfilled; } catch { patch.undo(); }
                },
            }),
        }),
    });

export const {
    useGetSensorsQuery,
    useGetSensorQuery,
    useGetSensorAlarmsQuery,
    useUpdateSensorNotifyMutation,
    useGetSensorConfigQuery,
    useUpdateSensorConfigMutation,
    useUpdateSensorMutation,
} = sensorApi;
