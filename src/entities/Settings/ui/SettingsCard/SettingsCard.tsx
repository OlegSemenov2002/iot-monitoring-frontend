import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Loader } from 'shared/ui/Loader/Loader';
import { Text, TextAlign, TextTheme } from 'shared/ui/Text/Text';

import { ThemeSelect } from 'entities/Settings/ui/ThemeSelect/ThemeSelect';
import { AppLang, UserSettings } from 'entities/Settings/model/types/settings';
import { Theme } from 'shared/const/ThemeTypes';
import { LangSelect } from 'entities/Settings/ui/LangSelect/LangSelect';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import cls from './SettingsCard.module.scss';

interface SettingsCardProps {
    className?: string;
    data?: UserSettings ;
    onChangeTheme?: (theme: Theme) => void;
    onChangeLang?: (theme: AppLang) => void;
    readonly?: boolean;
    isLoading?: boolean;
    error?: any;

}

export const SettingsCard = (props:SettingsCardProps) => {
    const { t } = useTranslation();
    const {
        className, data, onChangeTheme, onChangeLang, readonly, isLoading, error,
    } = props;
    const dispatch = useAppDispatch();

    if (isLoading) {
        return (
            <div className={classNames(cls.ProfileCard, { [cls.loading]: true }, [className])}>
                <Loader />
            </div>
        );
    }

    if (error) {
        return (
            <div className={classNames(cls.ProfileCard, {}, [className, cls.error])}>
                <Text
                    theme={TextTheme.ERROR}
                    title={t('Произошла ошибка при загрузке профиля')}
                    text={t('Попробуйте обновить страницу')}
                    align={TextAlign.CENTER}
                />
            </div>
        );
    }
    return (
        <div className={classNames(cls.SettingsCard, {}, [className])}>
            <div className={cls.data}>
                <ThemeSelect
                    className={cls.input}
                    value={data?.theme}
                    onChange={onChangeTheme}
                    readonly={readonly}
                />
                <LangSelect
                    className={cls.input}
                    value={data?.lang}
                    onChange={onChangeLang}
                    readonly={readonly}
                />
            </div>
        </div>
    );
};
