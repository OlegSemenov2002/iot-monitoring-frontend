export type SensorType = 'Smart-MS0101' | 'LWL04' | 'SmartHS0101' | 'Unknown';

interface BaseSensor {
    id: number | string;
    device_id: number | string;
    description: string;
    model: string;
    vendor: string;
    device_eui: string;
    first_act: string;
    battery: number | string;
    last_act: string;
    notify_loss: number | string;
    notify_sms: number | string;
    security_user_id: number | string;
    type: SensorType;
    auto_added: number | string;
    last_gateway_id: number | string;
    // Общие поля
}

interface Ms0101Specific {
    type: 'Smart-MS0101';
    req_confirm: boolean;
    adr: boolean;
    repeat_count: number | string;
    period_data_send: number | string;
    auto_arming: boolean;
    timezone: string;
    send_auto_arming: boolean;
    // Специфика MS0101 (alarm, config fields)
}

interface OtherSpecific {
    type: Exclude<SensorType, 'Smart-MS0101'>;
    // Заглушка: специфичные поля optional или empty
}

export type Sensor = BaseSensor & (Ms0101Specific | OtherSpecific);


// Utility
export type PartialSensor<T extends SensorType = SensorType> = T extends 'Smart-MS0101' ? Partial<Ms0101Specific> : Partial<OtherSpecific>;
export type SensorId = Sensor['id'];

// Для alarms/config (вложенные)
export interface SensorAlarm {
    id:  | string;
    device_id: number | string;
    datetime: string;
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
    datetime: string | string;
}