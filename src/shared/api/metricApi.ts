

import { rtkApi } from 'shared/api/rtkApi';


export enum METRIC_TYPE {
    NewMonthUsers = 'newMonthUsers',
    NotificationsLastMonth = 'notificationsLastMonth',
}

export interface MetricsResponse {
    [METRIC_TYPE.NewMonthUsers]: number;
    [METRIC_TYPE.NotificationsLastMonth]: number;
}

export const metricApi = rtkApi
    .enhanceEndpoints({ addTagTypes: ['Metrics'] })
    .injectEndpoints({
        endpoints: (build) => ({
            getMetrics: build.query<MetricsResponse, void>({
                query: () => `/metrics?ts=${Date.now()}`, // всегда свежие данные
                transformResponse: (response: any) => {
                    console.log('metricApi response:', response);
                    return {
                        newMonthUsers: typeof response.newMonthUsers === 'number' ? response.newMonthUsers : 0,
                        notificationsLastMonth: typeof response.notificationsLastMonth === 'number' ? response.notificationsLastMonth : 0,

                    };
                },
                providesTags: ['Metrics'],
            }),
        }),
    });

export const { useGetMetricsQuery } = metricApi;
