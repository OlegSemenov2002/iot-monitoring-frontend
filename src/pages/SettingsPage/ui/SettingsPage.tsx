import { classNames } from 'shared/lib/classNames/classNames';

import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';

import { SettingsCard } from 'entities/Settings/ui/SettingsCard/SettingsCard';
import { settingsActions, useGetSettingsDataQuery } from 'entities/Settings';
import { getSettingsForm } from 'entities/Settings/model/selectors/getSettingsForm/getSettingsForm';
import { SettingsPageHeader } from 'pages/SettingsPage/ui/SettingsPageHeader/SettingsPageHeader';
import { getSettingsReadonly } from 'entities/Settings/model/selectors/getSettingsReadonly/getSettingsReadonly';
import { LOCAL_STORAGE_THEME_KEY } from 'shared/const/localstorage';
import { AppLang, UserSettings } from 'entities/Settings/model/types/settings';
import { useCallback, useEffect, useRef } from 'react';

import { getUserAuthData } from 'entities/User';
import { Theme } from 'shared/const/ThemeTypes';
import { rtkApi } from 'shared/api/rtkApi';
import i18n from 'i18next';
import { Loader } from 'shared/ui/Loader/Loader';
import { Text, TextAlign, TextTheme } from 'shared/ui/Text/Text';
import { useTranslation } from 'react-i18next';
import cls from './SettingsPage.module.scss';
import {Page} from "shared/ui/Page/Page";

interface SettingsPageProps {
    className?: string;
}

const SettingsPage = ({ className }: SettingsPageProps) => {
    // const { t } = useTranslation();

    const dispatch = useAppDispatch();
    const formData = useSelector(getSettingsForm);

    const readonly = useSelector(getSettingsReadonly);

    const authData = useSelector(getUserAuthData);
    const userId = authData?.id;
    const { data, isLoading, error } = useGetSettingsDataQuery(userId!, { skip: !userId });

    const initedRef = useRef(false);
    useEffect(() => {
        if (!initedRef.current && data) {
            initedRef.current = true;
            dispatch(settingsActions.setForm({
                theme: data.theme, lang: data.lang, currency: data.currency,
            }));
        }
    }, [data, dispatch]);

    const { t } = useTranslation('settings');

    if (isLoading) {
        return (
            <Page>
                <Loader />
            </Page>
        );
    }

    if (error) {
        return (
            <Page>
                <Text
                    theme={TextTheme.ERROR}
                    title={t('Произошла ошибка при загрузке профиля')}
                    text={t('Попробуйте обновить страницу')}
                    align={TextAlign.CENTER}
                />
            </Page>
        );
    }

    const onChangeTheme = (theme: Theme) => dispatch(settingsActions.setForm({ theme }));

    const onChangeLang = (lang: AppLang) => dispatch(settingsActions.setForm({ lang }));
    return (

        <Page>
            <SettingsPageHeader userId={userId} form={formData!} />
            <SettingsCard
                data={formData}
                readonly={readonly}
                onChangeLang={onChangeLang}
                onChangeTheme={onChangeTheme}
            />
        </Page>
    );
};

export default SettingsPage;
