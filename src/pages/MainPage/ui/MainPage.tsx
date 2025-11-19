import React, {useMemo, useState} from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from 'shared/ui/Input/Input';
import { Page } from 'shared/ui/Page/Page';
import cls from './MainPage.module.scss'
import {classNames} from "shared/lib/classNames/classNames";
import ProgressCircle from "shared/ui/ProgressCircle/ProgressCircle";
import {MetricCard} from "shared/ui/MetricCard/MetricCard";
import {useGetAllMetrics} from "features/GetAllMetric/lib/useGetAllMetrics";
import {Skeleton} from "shared/ui/Skeleton/Skeleton";
import {METRIC_TYPE, MetricsResponse} from "shared/api/metricApi";

import {LineChart} from "lucide-react";
import {MetricChart} from "shared/ui/MetricChart/MetricChart";
import {useGetAlarmsQuery, useGetLastAlarmsByDeviceIdQuery} from "shared/api/alarmApi";

import {MetricChartCard} from "shared/ui/MetricChartCard/MetricChartCard";
import { useGetSensorsQuery } from 'shared/api/sensorApi';
import {mapMultipleDevicesAlarmsToChartData} from "entities/Alarm/model/utils/mapMultipleDevicesAlarmsToChartData";
import {useAlarmsChartData} from "features/AlarmsChart";
import {DateRange} from "shared/ui/DateRangePicker/DateRangePicker";
import {ScrollableRecentList} from "shared/ui/ScrollableRecentList/ScrollableRecentList";
import {SensorAlarm} from "entities/Sensor/model/types/sensor";
import {useRecentAlarms} from "features/AlarmsRecent";


interface MainPageProps{
    className?: string;
}


const MainPage = ({className}: MainPageProps) => {
    const { t } = useTranslation();
    const { getMetric, isLoading: isLoadingMetrics } = useGetAllMetrics();

    const newUsers = getMetric(METRIC_TYPE.NewMonthUsers);
    const notifications = getMetric(METRIC_TYPE.NotificationsLastMonth);

    const [chartRange, setChartRange] = useState<DateRange>({
        from: '2025-08-27',
        to: '2025-09-05',
    });


    const { chartData, isLoading: isLoadingChart } = useAlarmsChartData({ range: chartRange });

    const isLoading = isLoadingMetrics || isLoadingChart;

    const { recentAlarms, isLoading: isLoadingAlarms } = useRecentAlarms({ maxItems: 15 });





    // if (isLoadingSensorsChart) {
    //     return <div>Loading...</div>;
    // }
    //
    // if (error) {
    //     if ('status' in error) {
    //
    //         return <div>Error {error.status}: {JSON.stringify(error.data)}</div>;
    //     } else {
    //
    //         return <div>Error: {error.toString()}</div>;
    //     }
    // }



    return (
        <Page className={cls.Dashboard}>
            <div className={cls.CardsRow}>
                <MetricCard
                    title={t('New Clients (This Month)')}
                    value={newUsers ?? 0}
                    maxValue={200}
                    increase={`+${newUsers ?? 0}`}
                    loading={isLoading}
                />
                <MetricCard
                    title={t('Notifications (Last Month)')}
                    value={notifications ?? 0}
                    maxValue={10000}
                    increase={`+${notifications ?? 0}`}
                    loading={isLoading}
                />
            </div>

            <div className={cls.CardsRow}>
                <MetricChartCard
                    title={t('Notifications per Device (Last 7 days)')}
                    loading={isLoading}
                    data={chartData}
                    width={1200}
                    height={500}
                    initialRange={chartRange}
                    onRangeChange={setChartRange}
                />
                <ScrollableRecentList<SensorAlarm>
                    title={t('Last notifications')}
                    items={recentAlarms}
                    isLoading={isLoadingAlarms}
                    maxItems={15}
                    height={200}
                    renderItem={(alarm) => (
                        <div>
                            <strong>Device {alarm.device_id}</strong>: {alarm.date_time} (notify: {alarm.notify})
                        </div>
                    )}
                />
            </div>
        </Page>


    );
};

export default MainPage
