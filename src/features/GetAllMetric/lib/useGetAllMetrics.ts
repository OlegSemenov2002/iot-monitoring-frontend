import {useGetMetricsQuery, MetricsResponse, METRIC_TYPE} from 'shared/api/metricApi';

type MetricsKeys = keyof MetricsResponse;

export const useGetAllMetrics = () => {
    const { data, isLoading, isError } = useGetMetricsQuery();

    const metrics: MetricsResponse = {
        [METRIC_TYPE.NewMonthUsers]: data?.[METRIC_TYPE.NewMonthUsers] ?? 0,
        [METRIC_TYPE.NotificationsLastMonth]: data?.[METRIC_TYPE.NotificationsLastMonth] ?? 0,
    };

    const getMetric = (key: METRIC_TYPE): number => {
        return metrics[key];
    };

    return { metrics, getMetric, isLoading, isError };
};
