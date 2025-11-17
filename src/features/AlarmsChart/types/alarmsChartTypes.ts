export type AlarmsChartRange =
    | { from: string; to: string }  // Формат YYYY-MM-DD
    | { lastDays: number };


export interface AlarmsChartParams {
    range?: AlarmsChartRange;
}


export interface ChartData {
    id: string;      // e.g., "Sensor 1"
    name: string;    // e.g., "Sensor 1"
    color: string;   // e.g., "hsl(123, 70%, 50%)"
    data: Array<{ x: string; y: number }>;  // x: дата (YYYY-MM-DD), y: счёт тревог
}
