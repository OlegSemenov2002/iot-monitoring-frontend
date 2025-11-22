
import React, {useState} from 'react';
import { MetricChart } from 'shared/ui/MetricChart/MetricChart';
import { classNames } from 'shared/lib/classNames/classNames';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import cls from './MetricChartCard.module.scss';
import {AlarmsChartRange} from "features/AlarmsChart/types/alarmsChartTypes";
import {ChartData} from "shared/api/alarmApi";
import {DateRange, DateRangePicker} from "shared/ui/DateRangePicker/DateRangePicker";

interface MetricChartCardProps {
    className?: string;
    title: string;
    loading: boolean;
    data: any[];
    initialRange?: DateRange;
    onRangeChange: (newRange: DateRange) => void;
}

export const MetricChartCard: React.FC<MetricChartCardProps> = ({
    className,
    title,
    loading,
    data,
    initialRange,
    onRangeChange,

}) => {
    if (loading) {
        return <Skeleton
            width="100%"
            height={500}
        />
    }

    return (
        <section className={classNames(cls.MetricChartCard, {}, [className])}>
            <div className={cls.Header}>
                <h2 className={cls.Title}>{title}</h2>
                <DateRangePicker initialRange={initialRange} onChange={onRangeChange} />
            </div>

            <div className={cls.ChartContainer}>
                <MetricChart data={data} />
            </div>
        </section>
    );
};
