import { Sensor } from 'entities/Sensor';

export interface SensorEditState {
    form: Sensor | null;
    isEditing: boolean;
    isDirty: boolean;
    error?: string;
}