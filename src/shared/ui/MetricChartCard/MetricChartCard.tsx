
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
    width: number;
    height: number;
    initialRange?: DateRange;
    onRangeChange: (newRange: DateRange) => void;
}

export const MetricChartCard: React.FC<MetricChartCardProps> = ({
    className,
    title,
    loading,
    data,
    width,
    height,
    initialRange,
    onRangeChange,
}) => {
    const CARD_WIDTH = width;
    const CARD_HEIGHT = height + 80;

    if (loading) {
        return (
            <Skeleton
                width="100%"
                height={CARD_HEIGHT}
            />
        );
    }

    return (
        <section className={classNames(cls.MetricChartCard, {}, [className])}>
            <h2>{title}</h2>
            <DateRangePicker initialRange={initialRange} onChange={onRangeChange} />
            <MetricChart data={data} width={width} height={height} />
        </section>
    );
};
