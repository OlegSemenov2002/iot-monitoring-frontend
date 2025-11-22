export interface SensorType {
    id: number; // ID типа устройства (например, 1 для Smart-MS0101)
    name: 'Smart-MS0101' | 'Unknown'; // Название типа
}

export interface BaseSensor {
    id: number;
    device_eui: string;
    last_gateway_id: number;
    first_act: string;
    auto_added: number;
    last_act: string;
    battery: number;
    security_user_id: number;
    description: string;
    notify: number;
    notify_loss: number;
    type: string | number; // Обновлённый тип
}

export interface Ms0101Specific {
    id: number;
    req_confirm: boolean;
    adr: boolean;
    repeat_count: number;
    period_data_send: number;
    auto_arming: boolean;
    timezone: string;
    send_auto_arming: boolean;
    date_time: string;
}

export interface OtherSpecific {
    type: Exclude<SensorType['id'], 1>; // ID типов, кроме Smart-MS0101 (1)
    // Заглушка: специфичные поля отсутствуют, так как нет данных для других типов
}

export type Sensor = BaseSensor & (Ms0101Specific | OtherSpecific);


// Utility
export type PartialSensor<T extends SensorType = SensorType> = T extends 'Smart-MS0101' ? Partial<Ms0101Specific> : Partial<OtherSpecific>;
export type SensorId = Sensor['id'];

// Для alarms/config (вложенные)
export interface SensorAlarm {
    id:  number  | string;
    device_id: number | string;
    date_time: string;
    arming: boolean;
    date_fix: string | null;
    notify: boolean;
    notify_sms: boolean;
}

export interface SensorConfig {
    id: number | string;
    req_confirm: boolean;
    adr: boolean;
    repeat_count: number | string;
    period_data_send: number | string;
    auto_arming: boolean;
    timezone: string | string;
    send_auto_arming: boolean;
    date_time: string | string;
}


