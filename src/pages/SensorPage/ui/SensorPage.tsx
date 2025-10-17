import React from 'react';
import { useTranslation } from 'react-i18next';
import { Loader } from 'shared/ui/Loader/Loader';

import { Table } from 'shared/ui/Table/Table';
import { Switch } from 'shared/ui/Switch/Switch';
import { Sensor } from 'entities/Sensor/model/types/sensor';
import {Skeleton} from 'shared/ui/Skeleton/Skeleton';
import cls from './SensorPage.module.scss';
import {TextAlign} from "shared/ui/Text/Text";
import {Text} from "shared/ui/Text/Text";
import  {useGetSensorsQuery} from "shared/api/sensorApi";
import {useToggleSensorNotify} from "features/SensorNotifications/lib/useToggleSensorNotify";
import {SensorTable} from "entities/Sensor/ui/SensorTable";

const SensorPage = () => {

    const { t } = useTranslation('SensorPage');

    const { toggleNotify, isLoadingToggle, optimisticNotify } = useToggleSensorNotify();




    const { data: sensors, isLoading, error } = useGetSensorsQuery();
    console.log(sensors);


    let content;

    if (isLoading) {
        content = (
            <>
                <Skeleton className={cls.skeleton} width="100%" height={500} >
                    <Skeleton className={cls.skeleton} width="100%" height={50} />
                    <Skeleton className={cls.skeleton} width="100%" height={50} />
                    <Skeleton className={cls.skeleton} width="100%" height={50} />
                    <Skeleton className={cls.skeleton} width="100%" height={50} />
                    <Skeleton className={cls.skeleton} width="100%" height={50} />
                    <Skeleton className={cls.skeleton} width="100%" height={50} />
                    <Skeleton className={cls.skeleton} width="100%" height={50} />
                </Skeleton>

            </>
        );
    } else if (error) {
        content = (
            <Text
                align={TextAlign.CENTER}
                title={t('Произошла ошибка при загрузке статьи.')}
            />
        );
    } else {
        content = (
            <SensorTable sensors={sensors} />
        );
    }

    return content;
};

export default SensorPage;
