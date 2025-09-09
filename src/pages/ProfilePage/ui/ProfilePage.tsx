import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import {
    getProfileForm,
    profileActions,
    ProfileCard,
    profileReducer,
    useGetProfileDataQuery,
    useUpdateProfileMutation,
} from 'entities/Profile';
import { useCallback } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { Currency } from 'entities/Currency';
import { Country } from 'entities/Country';
import { getUserAuthData } from 'entities/User';
import { Loader } from 'shared/ui/Loader/Loader';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { ProfilePageHeader } from './ProfilePageHeader/ProfilePageHeader';

const reducers: ReducersList = {
    profile: profileReducer,
};

interface ProfilePageProps {
    className?: string;
}

const ProfilePage = ({ className }: ProfilePageProps) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const formData = useSelector(getProfileForm);
    const authData = useSelector(getUserAuthData);

    const [
        updateProfile,
        {
            data: updatedProfile, // было: data
            isLoading: isUpdateLoading, // было: isLoading
            isError: isUpdateError,
            isSuccess: isUpdateSuccess,
            error: updateError,
        },
    ] = useUpdateProfileMutation();

    // 2) Запрос: объект с алиасами (+ skip, если id нет)
    const {
        data: dataProfile, // было: data
        isLoading: isLoadingProfile, // было: isLoading
        isError: isErrorProfile,
        error: getError,
    } = useGetProfileDataQuery(authData?.id!, { skip: !authData?.id });

    const onChangeFirstname = useCallback((value?: string) => {
        dispatch(profileActions.setForm({ first: value || '' }));
    }, [dispatch]);

    const onChangeLastname = useCallback((value?: string) => {
        dispatch(profileActions.setForm({ lastname: value || '' }));
    }, [dispatch]);

    const onChangeCity = useCallback((value?: string) => {
        dispatch(profileActions.setForm({ city: value || '' }));
    }, [dispatch]);

    const onChangeAge = useCallback((value?: string) => {
        dispatch(profileActions.setForm({ age: Number(value || 0) }));
    }, [dispatch]);

    const onChangeUsername = useCallback((value?: string) => {
        dispatch(profileActions.setForm({ username: value || '' }));
    }, [dispatch]);

    const onChangeAvatar = useCallback((value?: string) => {
        dispatch(profileActions.setForm({ avatar: value || '' }));
    }, [dispatch]);

    const onChangeCurrency = useCallback((currency: Currency) => {
        dispatch(profileActions.setForm({ currency }));
    }, [dispatch]);

    const onChangeCountry = useCallback((country: Country) => {
        dispatch(profileActions.setForm({ country }));
    }, [dispatch]);
    if (isLoadingProfile) {
        return <Loader />;
    }
    if (isErrorProfile) {
        return <Text theme={TextTheme.ERROR} title="error" />;
    }

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <div className={classNames('', {}, [className])}>
                <ProfilePageHeader onSave={updateProfile} />
                <ProfileCard
                    data={formData}
                    isLoading={isLoadingProfile}
                    error={isErrorProfile}
                    onChangeFirstname={onChangeFirstname}
                    onChangeLastname={onChangeLastname}
                    onChangeAge={onChangeAge}
                    onChangeCity={onChangeCity}
                    onChangeUsername={onChangeUsername}
                    onChangeAvatar={onChangeAvatar}
                    onChangeCurrency={onChangeCurrency}
                    onChangeCountry={onChangeCountry}
                />
            </div>
        </DynamicModuleLoader>
    );
};

export default ProfilePage;
