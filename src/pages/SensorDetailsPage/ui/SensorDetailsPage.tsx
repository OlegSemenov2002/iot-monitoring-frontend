import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import {SENSOR_CARD_VIEWS, SensorCard} from 'entities/Sensor/ui/SensorCard/SensorCard';
import { useParams } from 'react-router-dom';
import { useGetSensorQuery } from 'shared/api/sensorApi';
import React, {memo, useCallback, useRef} from 'react';
import { useGetLastAlarmsByDeviceIdQuery } from 'shared/api/alarmApi';
import { AlarmList } from 'widgets/AlarmList';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import { Page } from 'shared/ui/Page/Page';
import cls from './SensorDetailsPage.module.scss';
import {useSensorEdit} from "features/sensor-card-edit/lib/useSensorEdit";
import {Sensor} from "entities/Sensor";
import {Text, TextAlign, TextTheme} from "shared/ui/Text/Text";

interface SensorDetailsPageProps {
    className?: string;
}

const SensorDetailsPage = ({ className }: SensorDetailsPageProps) => {
    const { t } = useTranslation();
    const { id } = useParams<{ id: string }>();

    const { data: sensor, isLoading, error } = useGetSensorQuery(Number(id));


    const edit = useSensorEdit(sensor ?? ({} as Sensor));

    const pageRef = useRef<HTMLDivElement | null>(null);

    if (isLoading) {
        return <Skeleton className={cls.skeleton} width={'40%'} height={400} />;
    }

    if (error || !sensor) {
        return <div>{t('Ошибка загрузки данных')}</div>;
    }

    if(error || !sensor || edit.error){

        return (
            <Text
                theme={TextTheme.ERROR}
                align={TextAlign.CENTER}
                title={t('Произошла ошибка при сохранении.')}
            />
        )

    }

    return (
        <Page ref={pageRef}>
            <SensorCard
                key={sensor.id}
                view={SENSOR_CARD_VIEWS.FULL}
                sensor={edit.form}
                readonly={!edit.isEditing}
                isDirty={edit.isDirty}
                isSaving={edit.isSaving}
                isEditing={edit.isEditing}
                onChange={edit.updateField}
                onEdit={edit.startEdit}
                onSave={edit.save}
                onCancel={edit.cancelEdit}
                error={edit.error}
            />

            <AlarmList sensorId={Number(id)} wrapperRef={pageRef} />
        </Page>
    );
};

export default memo(SensorDetailsPage);
