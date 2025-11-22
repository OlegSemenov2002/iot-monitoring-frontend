import { classNames, Mods } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Text, TextAlign, TextTheme } from 'shared/ui/Text/Text';
import { Input, INPUT_VIEWS } from 'shared/ui/Input/Input';
import { Loader } from 'shared/ui/Loader/Loader';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Currency } from 'entities/Currency/model/types/currency';
import { CurrencySelect } from 'entities/Currency';
import { Country } from 'entities/Country/model/types/country';
import { CountrySelect } from 'entities/Country';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { usePermission, ACTIONS, RESOURCES } from 'shared/lib/rbac';
import cls from './ProfileCard.module.scss';
import { Profile } from '../../model/types/profile';

interface ProfileCardProps {
    className?: string;
    data?: Profile;
    error?: any;
    isLoading?: boolean;
    readonly?: boolean;
    isEditing?: boolean;
    isDirty?: boolean;
    isSaving?: boolean;
    onEdit?: () => void;
    onSave?: () => void;
    onCancel?: () => void;
    onChangeLastname?: (value?: string) => void;
    onChangeFirstname?: (value?: string) => void;
    onChangeCity?: (value?: string) => void;
    onChangeAge?: (value?: string) => void;
    onChangeUsername?: (value?: string) => void;
    onChangeAvatar?: (value?: string) => void;
    onChangeCurrency?: (currency: Currency) => void;
    onChangeCountry?: (country: Country) => void;
}

export const ProfileCard = (props: ProfileCardProps) => {
    const {
        className,
        data,
        isLoading,
        error,
        readonly: readonlyProp = true,
        isEditing = false,
        isDirty = false,
        isSaving = false,
        onEdit,
        onSave,
        onCancel,
        onChangeFirstname,
        onChangeLastname,
        onChangeAge,
        onChangeCity,
        onChangeAvatar,
        onChangeUsername,
        onChangeCountry,
        onChangeCurrency,
    } = props;

    const { t } = useTranslation('profile');

    if (isLoading) {
        return (
            <div className={classNames(cls.ProfileCard, { [cls.loading]: true }, [className])}>
                <Loader />
            </div>
        );
    }

    if (error) {
        return (
            <div className={classNames(cls.ProfileCard, { [cls.error]: true }, [className])}>
                <Text
                    theme={TextTheme.ERROR}
                    title={t('Произошла ошибка при загрузке профиля')}
                    text={t('Попробуйте обновить страницу')}
                    align={TextAlign.CENTER}
                />
            </div>
        );
    }

    const ownerId = data?.userId ?? data?.id;

    const canStartEdit = usePermission({
        action: ACTIONS.PROFILE_EDIT_START,
        resource: RESOURCES.PROFILE,
        ownerId,
    });

    const canUpdate = usePermission({
        action: ACTIONS.PROFILE_UPDATE,
        resource: RESOURCES.PROFILE,
        ownerId,
    });

    const canCancel = usePermission({
        action: ACTIONS.PROFILE_EDIT_CANCEL,
        resource: RESOURCES.PROFILE,
        ownerId,
    });

    const isReadonlyByRbac = !canUpdate;
    const readonly = readonlyProp || isReadonlyByRbac;

    const mods: Mods = {
        [cls.editing]: isEditing && !readonly,
    };

    const firstName = data?.first ?? '';
    const lastName = data?.lastname ?? '';
    const age = data?.age ?? '';
    const city = data?.city ?? '';
    const username = data?.username ?? '';
    const avatar = data?.avatar ?? '';
    const currency = data?.currency;
    const country = data?.country;
    const position = (data as any)?.position ?? '';

    const showEditButton = canStartEdit;
    const showSaveCancel = !readonly && (canUpdate || canCancel);

    return (
        <div className={classNames(cls.ProfileCard, mods, [className])}>
            <div className={cls.headerRow}>
                <div className={cls.titleBlock}>
                    <span className={cls.titleLabel}>{t('Профиль пользователя')}</span>
                    <span className={cls.titleValue}>
                        {username || firstName || t('Без имени')}
                    </span>
                </div>

                <div className={cls.headerControls}>
                    {avatar && (
                        <div className={cls.avatarWrapper}>
                            <Avatar src={avatar} />
                        </div>
                    )}

                    <div className={cls.actions}>
                        {showSaveCancel ? (
                            <>
                                <Button
                                    className={cls.actionBtn}
                                    theme={ButtonTheme.OUTLINE_RED}
                                    onClick={onCancel}
                                    disabled={isSaving || !canCancel}
                                >
                                    {t('Отменить')}
                                </Button>
                                <Button
                                    className={cls.actionBtn}
                                    theme={ButtonTheme.OUTLINE}
                                    onClick={onSave}
                                    disabled={isSaving || !isDirty || !canUpdate}
                                >
                                    {t('Сохранить')}
                                </Button>
                            </>
                        ) : (
                            showEditButton && (
                                <Button
                                    className={cls.actionBtn}
                                    theme={ButtonTheme.OUTLINE}
                                    onClick={onEdit}
                                    disabled={isSaving || !canStartEdit}
                                >
                                    {t('Редактировать')}
                                </Button>
                            )
                        )}
                    </div>
                </div>
            </div>

            <div className={cls.contentRow}>
                <div className={cls.detailsCard}>
                    <div className={cls.detailsHeader}>
                        {t('Основная информация')}
                    </div>

                    <div className={cls.detailsGrid}>
                        <div className={cls.detailsLabel}>{t('Ваше имя')}</div>
                        <div className={cls.detailsValue}>
                            {readonly ? (
                                <span className={cls.staticValue}>{firstName || '—'}</span>
                            ) : (
                                <Input
                                    view={INPUT_VIEWS.IOT}
                                    value={firstName}
                                    placeholder={t('Ваше имя')}
                                    className={cls.input}
                                    onChange={onChangeFirstname}
                                    readonly={false}
                                />
                            )}
                        </div>

                        <div className={cls.detailsLabel}>{t('Ваша фамилия')}</div>
                        <div className={cls.detailsValue}>
                            {readonly ? (
                                <span className={cls.staticValue}>{lastName || '—'}</span>
                            ) : (
                                <Input
                                    view={INPUT_VIEWS.IOT}
                                    value={lastName}
                                    placeholder={t('Ваша фамилия')}
                                    className={cls.input}
                                    onChange={onChangeLastname}
                                    readonly={false}
                                />
                            )}
                        </div>

                        <div className={cls.detailsLabel}>{t('Ваш возраст')}</div>
                        <div className={cls.detailsValue}>
                            {readonly ? (
                                <span className={cls.staticValue}>{age || '—'}</span>
                            ) : (
                                <Input
                                    view={INPUT_VIEWS.IOT}
                                    value={age}
                                    placeholder={t('Ваш возраст')}
                                    className={cls.input}
                                    onChange={onChangeAge}
                                    readonly={false}
                                />
                            )}
                        </div>

                        <div className={cls.detailsLabel}>{t('Город')}</div>
                        <div className={cls.detailsValue}>
                            {readonly ? (
                                <span className={cls.staticValue}>{city || '—'}</span>
                            ) : (
                                <Input
                                    view={INPUT_VIEWS.IOT}
                                    value={city}
                                    placeholder={t('Город')}
                                    className={cls.input}
                                    onChange={onChangeCity}
                                    readonly={false}
                                />
                            )}
                        </div>

                        <div className={cls.detailsLabel}>{t('Имя пользователя')}</div>
                        <div className={cls.detailsValue}>
                            {readonly ? (
                                <span className={cls.staticValue}>{username || '—'}</span>
                            ) : (
                                <Input
                                    view={INPUT_VIEWS.IOT}
                                    value={username}
                                    placeholder={t('Введите имя пользователя')}
                                    className={cls.input}
                                    onChange={onChangeUsername}
                                    readonly={false}
                                />
                            )}
                        </div>

                        <div className={cls.detailsLabel}>{t('Должность')}</div>
                        <div className={cls.detailsValue}>
                            <span className={cls.staticValue}>{position || '—'}</span>
                        </div>

                        <div className={cls.detailsLabel}>{t('Ссылка на аватар')}</div>
                        <div className={cls.detailsValue}>
                            {readonly ? (
                                <span className={cls.staticValue}>{avatar || '—'}</span>
                            ) : (
                                <Input
                                    view={INPUT_VIEWS.IOT}
                                    value={avatar}
                                    placeholder={t('Введите ссылку на аватар')}
                                    className={cls.input}
                                    onChange={onChangeAvatar}
                                    readonly={false}
                                />
                            )}
                        </div>

                        <div className={cls.detailsLabel}>{t('Валюта')}</div>
                        <div className={cls.detailsValue}>
                            {readonly ? (
                                <span className={cls.staticValue}>{currency || '—'}</span>
                            ) : (
                                <CurrencySelect
                                    className={cls.input}
                                    value={currency}
                                    onChange={onChangeCurrency!}
                                />
                            )}
                        </div>

                        <div className={cls.detailsLabel}>{t('Страна')}</div>
                        <div className={cls.detailsValue}>
                            {readonly ? (
                                <span className={cls.staticValue}>{country || '—'}</span>
                            ) : (
                                <CountrySelect
                                    className={cls.input}
                                    value={country}
                                    onChange={onChangeCountry!}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
