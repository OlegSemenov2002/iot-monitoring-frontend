import { rtkApi } from 'shared/api/rtkApi';
import { UserSettings } from 'entities/Settings/model/types/settings';
import i18n from 'i18next';
import { LOCAL_STORAGE_THEME_KEY } from 'shared/const/localstorage';
import { Profile } from 'entities/Profile';

export const profileApi = rtkApi
    .enhanceEndpoints({ addTagTypes: ['Profile'] })
    .injectEndpoints({
        endpoints: (build) => ({
            getProfileData: build.query<Profile, string>({
                query: (userId) => `/profile/${userId}`,
                providesTags: (result, error, userId) => [{ type: 'Profile', id: userId }],

                keepUnusedDataFor: 60 * 60 * 24, // 24 часа
            }),

            updateProfile: build.mutation<Profile, { userId: string; profileForm: Profile }>({
                query: ({ userId, profileForm }) => ({
                    url: `/profile/${userId}`,
                    method: 'PATCH',
                    body: profileForm,
                }),
                invalidatesTags: (_res, _err, { userId }) => [{ type: 'Profile', id: userId }],
            }),

        }),
    });

export const { useGetProfileDataQuery, useUpdateProfileMutation } = profileApi;
