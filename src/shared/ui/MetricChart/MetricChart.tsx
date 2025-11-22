import React from "react";
import { ResponsiveLine } from "@nivo/line";

import cls from "./MetricChart.module.scss";
import { Theme, useTheme } from "app/providers/ThemeProvider";
import { ChartData } from "shared/api/alarmApi";
import {useTranslation} from "react-i18next";

interface MetricChartProps {
    data?: ChartData[];
    isDashboard?: boolean;
}


const getColorsByTheme = (theme: Theme) => {
    switch (theme) {
        case Theme.DARK:
        case Theme.MIDDLE:
        case Theme.LIGHT:
        default:
            return {
                grey: "var(--text-primary)",
                primary: "var(--primary-color)",
            };
    }
};

export const MetricChart: React.FC<MetricChartProps> = ({
    data = [],
    isDashboard = false,
}) => {
    const { theme } = useTheme();
    const colors = getColorsByTheme(theme);
    const {t} = useTranslation();


    return (
        <div className={cls.MetricChart}>
            <ResponsiveLine
                data={data}
                margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                xScale={{ type: "point" }}
                yScale={{ type: "linear", min: "auto", max: "auto" }}
                curve="catmullRom"
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    tickSize: 0,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: isDashboard ? undefined : t('Date'),
                    legendOffset: 36,
                    legendPosition: "middle",
                }}
                axisLeft={{
                    tickSize: 3,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: isDashboard ? undefined : t('Count'),
                    legendOffset: -40,
                    legendPosition: "middle",
                }}
                enableGridX={false}
                enableGridY={false}
                colors={{ scheme: "set2" }}
                pointSize={8}
                pointColor={{ theme: "background" }}
                pointBorderWidth={2}
                pointBorderColor={{ from: "serieColor" }}
                useMesh={true}
                legends={[
                    {
                        anchor: "bottom-right",
                        direction: "column",
                        translateX: 100,
                        itemWidth: 80,
                        itemHeight: 20,
                        symbolSize: 12,
                        symbolShape: "circle",
                        itemOpacity: 0.75,
                        toggleSerie: true,
                        effects: [{ on: "hover", style: { itemOpacity: 1 } }],
                    },
                ]}
                theme={{
                    axis: {
                        domain: { line: { stroke: colors.grey } },
                        ticks: {
                            line: { stroke: colors.grey, strokeWidth: 1 },
                            text: { fill: colors.grey },
                        },
                        legend: { text: { fill: colors.grey } },
                    },
                    legends: { text: { fill: colors.grey } },
                    tooltip: {
                        container: {
                            background: "var(--card-bg)",
                            color: "var(--text-primary)",
                        },
                    },
                }}
            />
        </div>
    );
};
