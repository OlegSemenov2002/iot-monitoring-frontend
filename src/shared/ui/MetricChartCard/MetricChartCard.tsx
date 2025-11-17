// src/shared/ui/MetricChartCard/MetricChartCard.tsx
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
    data: any[]; // Типизируйте как ChartData[], если есть
    width: number;
    height: number;
    initialRange?: DateRange; // Новый пропс для начального range
    onRangeChange: (newRange: DateRange) => void; // Callback для обновления range в parent
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
    return (
        <section className={classNames(cls.MetricChartCard, {}, [className])}>
            <h2>{title}</h2>
            {/* Picker для выбора диапазона дат */}
            <DateRangePicker initialRange={initialRange} onChange={onRangeChange} />
            {loading ? (
                <Skeleton width={width} height={height} />
            ) : (
                <MetricChart data={data} width={width} height={height} />
            )}
        </section>
    );
};
