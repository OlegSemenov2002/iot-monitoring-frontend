// src/shared/ui/MetricChart/MetricChart.tsx
import { ResponsiveLine } from "@nivo/line";

import cls from './MetricChart.module.scss';
import {Theme, useTheme} from "app/providers/ThemeProvider";
import {ChartData} from "shared/api/alarmApi";



interface MetricChartProps {
    data?: ChartData[];
    width?: number;
    height?: number;
    isDashboard?: boolean;
}


interface MetricChartProps {
    data?: ChartData[]; // может быть undefined
    width?: number;
    height?: number;
    isDashboard?: boolean;
}

export const MetricChart: React.FC<MetricChartProps> = ({
    data = [], // дефолтный пустой массив
    width = 1200,
    height = 400,
    isDashboard = false,
}) => {
    const { theme } = useTheme();

    const colors = (() => {
        switch (theme) {
            case Theme.DARK: return { grey: ["#fff"], primary: ["#1e88e5"] };
            case Theme.BLUE: return { grey: ["#fff"], primary: ["#90caf9"] };
            case Theme.LIGHT:
            default: return { grey: ["#fff"], primary: ["#90caf9"] };
        }
    })();

    console.log("POINTS", data);

    return (
        <div className={cls.MetricChart} style={{ width, height }}>
            <ResponsiveLine
                data={data} // теперь всегда массив
                margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                xScale={{ type: "point" }}
                yScale={{ type: "linear", min: "auto", max: "auto"}}
                curve="catmullRom"
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    tickSize: 0,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: isDashboard ? undefined : "Date",
                    legendOffset: 36,
                    legendPosition: "middle",
                }}
                axisLeft={{
                    tickSize: 3,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: isDashboard ? undefined : "Count",
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
                        domain: { line: { stroke: colors.grey[0] } },
                        ticks: { line: { stroke: colors.grey[0], strokeWidth: 1 }, text: { fill: colors.grey[0] } },
                        legend: { text: { fill: colors.grey[0] } },
                    },
                    legends: { text: { fill: colors.grey[0] } },
                    tooltip: { container: { background: colors.primary[0], color: "#fff" } },
                }}
            />
        </div>
    );
};
