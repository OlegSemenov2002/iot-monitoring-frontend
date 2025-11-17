import { rtkApi } from 'shared/api/rtkApi';
import { Sensor, SensorAlarm, SensorConfig } from 'entities/Sensor/model/types/sensor';
import {mapMultipleDevicesAlarmsToChartData} from "entities/Alarm/model/utils/mapMultipleDevicesAlarmsToChartData";
import {FetchBaseQueryError} from "@reduxjs/toolkit/query";


export interface ChartPoint {
    x: string;
    y: number;
}

export interface ChartData {
    id: string;
    color?: string;
    data: ChartPoint[];
}


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
            getLastAlarmsPartlyByDeviceId: build.query({
                query: ({ deviceId, page, n }) => ({
                    url: '/alarms',
                    params: {
                        device_id: deviceId,
                        _sort: 'date_time',
                        _order: 'desc',
                        _page: page,
                        _limit: n,
                    },
                }),

                providesTags: (result, error, { deviceId }) => [{ type: 'Alarms', id: deviceId }],
            }),
            getAlarms: build.query<SensorAlarm[], void>({
                query: () => '/alarms',
            }),
        }),
    });

export const {
    useGetLastAlarmsByDeviceIdQuery,
    useGetLastAlarmsPartlyByDeviceIdQuery,
    useGetAlarmsQuery

} = alarmApi;
