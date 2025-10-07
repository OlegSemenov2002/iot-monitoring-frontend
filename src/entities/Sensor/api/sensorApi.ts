// shared/api/sensorApi.ts (API для списка)
import { rtkApi } from 'shared/api/rtkApi';
import { Sensor, SensorAlarm, SensorConfig } from '../model/types/sensor';

export const sensorApi = rtkApi
    .enhanceEndpoints({ addTagTypes: ['Alarms', 'Sensors', 'Config'] })
    .injectEndpoints({
    endpoints: (build) => ({
        getSensors: build.query<Sensor[], void>({
            query: () => '/devices', // Лист всех девайсов
            providesTags: ['Sensors'],
            transformResponse: (response: any[]) => response.map(device => ({
                ...device,
                type: device.model === 'Smart-MS0101' ? 'Smart-MS0101' : 'Unknown', // Определение типа
            })),
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

export const { useGetSensorsQuery, useGetSensorAlarmsQuery, useGetSensorConfigQuery, useUpdateSensorConfigMutation } = sensorApi;