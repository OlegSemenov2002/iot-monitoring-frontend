import React, {
    useCallback,
    useEffect,
    useMemo,
    useState,
} from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';

import {
    ProfileCard,
    useGetProfileDataQuery,
    useUpdateProfileMutation,
} from 'entities/Profile';

import { useSelector } from 'react-redux';
import { getUserAuthData } from 'entities/User';

import { Page } from 'shared/ui/Page/Page';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import { Text, TextTheme } from 'shared/ui/Text/Text';

import { Currency } from 'entities/Currency';
import { Country } from 'entities/Country';
import { Profile } from 'entities/Profile/model/types/profile';

import cls from './ProfilePage.module.scss';

interface ProfilePageProps {
    className?: string;
}

const ProfilePage = ({ className }: ProfilePageProps) => {
    const { t } = useTranslation('profile');
    const authData = useSelector(getUserAuthData);


    const {
        data: loadedProfile,
        isLoading: isLoadingProfile,
        isError: isErrorProfile,
        error: loadError,
    } = useGetProfileDataQuery(authData?.id!, { skip: !authData?.id });

    const [
        updateProfile,
        {
            isLoading: isSaving,
            isError: isSaveError,
            error: saveError,
        },
    ] = useUpdateProfileMutation();


    const [form, setForm] = useState<Profile | null>(null);
    const [isEditing, setIsEditing] = useState(false);


    useEffect(() => {
        if (loadedProfile) {
            setForm(loadedProfile);
        }
    }, [loadedProfile]);


    const isDirty = useMemo(() => {
        if (!loadedProfile || !form) return false;
        return JSON.stringify(loadedProfile) !== JSON.stringify(form);
    }, [loadedProfile, form]);


    const updateField = useCallback(
        <K extends keyof Profile>(field: K, value: Profile[K]) => {
            setForm((prev) => (prev ? { ...prev, [field]: value } : prev));
        },
        [],
    );


    const onChangeFirstname = useCallback(
        (value?: string) => {
            updateField('first', (value || '') as Profile['first']);
        },
        [updateField],
    );

    const onChangeLastname = useCallback(
        (value?: string) => {
            updateField('lastname', (value || '') as Profile['lastname']);
        },
        [updateField],
    );

    const onChangeCity = useCallback(
        (value?: string) => {
            updateField('city', (value || '') as Profile['city']);
        },
        [updateField],
    );

    const onChangeAge = useCallback(
        (value?: string) => {
            updateField('age', Number(value || 0) as Profile['age']);
        },
        [updateField],
    );

    const onChangeUsername = useCallback(
        (value?: string) => {
            updateField('username', (value || '') as Profile['username']);
        },
        [updateField],
    );

    const onChangeAvatar = useCallback(
        (value?: string) => {
            updateField('avatar', (value || '') as Profile['avatar']);
        },
        [updateField],
    );

    const onChangeCurrency = useCallback(
        (currency: Currency) => {
            updateField('currency', currency as Profile['currency']);
        },
        [updateField],
    );

    const onChangeCountry = useCallback(
        (country: Country) => {
            updateField('country', country as Profile['country']);
        },
        [updateField],
    );



    const handleEdit = useCallback(() => {
        setIsEditing(true);
    }, []);

    const handleCancel = useCallback(() => {
        setForm(loadedProfile ?? null);
        setIsEditing(false);
    }, [loadedProfile]);

    const handleSave = useCallback(async () => {
        if (!form || !authData?.id) return;

        try {
            const updated = await updateProfile({
                userId: authData.id,
                profileForm: form,
            }).unwrap();


            setForm(updated as Profile);
            setIsEditing(false);
        } catch (e) {
            console.error(e);
        }
    }, [form, authData?.id, updateProfile]);



    if (isLoadingProfile || !form) {
        return (
            <Page className={classNames(cls.ProfilePage, {}, [className])}>
                <Skeleton className={cls.skeleton} width="40%" height={200} />
            </Page>
        );
    }

    if (isErrorProfile) {
        return (
            <Page className={classNames(cls.ProfilePage, {}, [className])}>
                <Text theme={TextTheme.ERROR} title={t('Ошибка загрузки профиля')} />
                {loadError && (
                    <Text theme={TextTheme.ERROR} text={String((loadError as any)?.data || '')} />
                )}
            </Page>
        );
    }

    return (
        <Page className={classNames(cls.ProfilePage, {}, [className])}>
            <ProfileCard
                data={form}

                readonly={!isEditing || isSaving}
                isEditing={isEditing}
                isDirty={isDirty}
                isSaving={isSaving}

                onEdit={handleEdit}
                onCancel={handleCancel}
                onSave={handleSave}

                onChangeFirstname={onChangeFirstname}
                onChangeLastname={onChangeLastname}
                onChangeAge={onChangeAge}
                onChangeCity={onChangeCity}
                onChangeUsername={onChangeUsername}
                onChangeAvatar={onChangeAvatar}
                onChangeCurrency={onChangeCurrency}
                onChangeCountry={onChangeCountry}
            />

            {isSaveError && (
                <Text
                    theme={TextTheme.ERROR}
                    text={t('Произошла ошибка при сохранении профиля')}
                />
            )}
        </Page>
    );
};

export default ProfilePage;
