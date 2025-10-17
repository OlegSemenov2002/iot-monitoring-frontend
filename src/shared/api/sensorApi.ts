// shared/api/sensorApi.ts (API для списка)
import { rtkApi } from 'shared/api/rtkApi';
import { Sensor, SensorAlarm, SensorConfig } from 'entities/Sensor/model/types/sensor';

export const sensorApi = rtkApi
    .enhanceEndpoints({ addTagTypes: ['Alarms', 'Sensors', 'Config'] })
    .injectEndpoints({
        endpoints: (build) => ({
            getSensors: build.query<any[], void>({
                query: () => '/devices',
                providesTags: ['Sensors'],
                // transformResponse: (response: any[]) => response.map((device) => ({
                //     ...device,
                //     type: device.model === 'Smart-MS0101' ? 'Smart-MS0101' : 'Unknown', // Определение типа
                // })),

            }),

            updateSensorNotify: build.mutation<Sensor, { sensorId: number; notifyStatus: number }>({
                query: ({ sensorId, notifyStatus }) => ({
                    url: `/devices/${sensorId}`,
                    method: 'PATCH',
                    body: { notify: notifyStatus },
                }),
                // Убрали invalidatesTags: ['Sensors']
                async onQueryStarted({ sensorId, notifyStatus }, { dispatch, queryFulfilled }) {
                    // Оптимистическое обновление кэша getSensors
                    const patchResult = dispatch(
                        sensorApi.util.updateQueryData('getSensors', undefined, (draft) => {
                            const sensor = draft.find((s) => s.id === sensorId);
                            if (sensor) {
                                sensor.notify = notifyStatus; // Точечное обновление поля notify
                            }
                        })
                    );
                    try {
                        const { data } = await queryFulfilled;
                        // Точное обновление кэша ответом сервера
                        dispatch(
                            sensorApi.util.updateQueryData('getSensors', undefined, (draft) => {
                                const index = draft.findIndex((s) => s.id === sensorId);
                                if (index !== -1) {
                                    draft[index] = data; // Заменяем сенсор ответом сервера
                                }
                            })
                        );
                    } catch {
                        patchResult.undo(); // Откат при ошибке
                    }
                },
            }),

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
                    // Убрал if (config.type !== 'Smart-MS0101') — заглушка не нужна здесь; для non-MS0101 используй отдельный endpoint позже
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
    useGetSensorAlarmsQuery,
    useUpdateSensorNotifyMutation,
    useGetSensorConfigQuery,
    useUpdateSensorConfigMutation,
} = sensorApi;
