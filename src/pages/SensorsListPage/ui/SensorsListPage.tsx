import React from 'react';
import { useTranslation } from 'react-i18next';

import {Skeleton} from 'shared/ui/Skeleton/Skeleton';
import cls from './SensorsListPage.module.scss';
import {TextAlign} from "shared/ui/Text/Text";
import {Text} from "shared/ui/Text/Text";
import  {useGetSensorsQuery} from "shared/api/sensorApi";
import {useToggleSensorNotify} from "features/SensorNotifications/lib/useToggleSensorNotify";
import {SensorTable} from "entities/Sensor/ui/SensorTable";
import {Page} from "shared/ui/Page/Page";

const SensorsListPage = () => {

    const { t } = useTranslation('SensorPage');

    const { toggleNotify, isLoadingToggle, optimisticNotify } = useToggleSensorNotify();




    const { data: sensors, isLoading, error } = useGetSensorsQuery();
    console.log(sensors);


    let content;

    if (isLoading) {
        content = (
            <>

                <Page>
                    <Skeleton className={cls.skeleton} width="100%" height={50} />
                    <Skeleton className={cls.skeleton} width="100%" height={50} />
                    <Skeleton className={cls.skeleton} width="100%" height={50} />
                    <Skeleton className={cls.skeleton} width="100%" height={50} />
                </Page>












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
            <Page>
                <SensorTable sensors={sensors} />
            </Page>

        );
    }

    return content;
};

export default SensorsListPage;
