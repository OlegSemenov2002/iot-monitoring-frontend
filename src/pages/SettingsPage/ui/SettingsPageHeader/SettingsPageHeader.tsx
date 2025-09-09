import { classNames } from 'shared/lib/classNames/classNames';
import { Text } from 'shared/ui/Text/Text';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { getProfileReadonly, profileActions } from 'entities/Profile';
import { useCallback } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { settingsActions, useUpdateSettingsMutation } from 'entities/Settings';
import { getSettingsReadonly } from 'entities/Settings/model/selectors/getSettingsReadonly/getSettingsReadonly';
import { UserSettings } from 'entities/Settings/model/types/settings';
import { useTheme } from 'app/providers/ThemeProvider';
import cls from './SettingsPageHeader.module.scss';

interface SettingsPageHeaderProps {
    className?: string;
    userId?:string;
    form: UserSettings;
    isLoading?: boolean;
    error?: any;
}

export const SettingsPageHeader = (props: SettingsPageHeaderProps) => {
    const {
        className,
        userId,
        form,
        isLoading,
        error,
    } = props;

    const { changeTheme } = useTheme();

    const dispatch = useAppDispatch();
    const [updateSettings, { isLoading: boolean }] = useUpdateSettingsMutation();

    const { t } = useTranslation('profile');

    const readonly = useSelector(getSettingsReadonly);

    const onEdit = useCallback(() => {
        dispatch(settingsActions.startEdit());
    }, [dispatch]);

    const onCancelEdit = useCallback(() => {
        dispatch(settingsActions.cancelEdit());
    }, [dispatch]);

    const onSave = async () => {
        if (!userId || !form) return;
        await updateSettings({ userId, ...form }).unwrap();
        // UI завершает редактирование и чистит backup
        dispatch(settingsActions.saveDone());
    };

    // const onSave = useCallback(async () => {
    //     const res = await updateSettings({ userId, ...form }).unwrap();
    //     changeTheme(res?.theme ?? form.theme); // применяем тут
    //     dispatch(settingsActions.setReadonly(true));
    // }, [dispatch, userId, form, updateSettings]);

    return (
        <div className={classNames('', {}, [className])}>
            <Text title={t('Настройки')} />
            {readonly
                ? (
                    <Button
                        className={cls.editBtn}
                        theme={ButtonTheme.OUTLINE}
                        onClick={onEdit}
                        disabled={isLoading}
                    >
                        {t('Редактировать')}
                    </Button>
                )
                : (
                    <>
                        <Button
                            className={cls.editBtn}
                            theme={ButtonTheme.OUTLINE_RED}
                            onClick={onCancelEdit}
                            disabled={isLoading}
                        >
                            {t('Отменить')}
                        </Button>
                        <Button
                            className={cls.saveBtn}
                            theme={ButtonTheme.OUTLINE}
                            onClick={onSave}
                            disabled={isLoading}
                        >
                            {t('Сохранить')}
                        </Button>
                    </>
                )}
        </div>
    );
};
