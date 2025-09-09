import { rtkApi } from 'shared/api/rtkApi';
import { UserSettings } from 'entities/Settings/model/types/settings';
import i18n from 'i18next';
import { LOCAL_STORAGE_THEME_KEY } from 'shared/const/localstorage';

export const settingsApi = rtkApi
    .enhanceEndpoints({ addTagTypes: ['Settings'] })
    .injectEndpoints({
        endpoints: (build) => ({
            getSettingsData: build.query<UserSettings, string>({
                query: (userId) => ({
                    url: `/userSettings/${userId}`,
                }),

                providesTags: (_res, _err, userId) => [{ type: 'Settings', id: userId }],

                async onQueryStarted(userId, { queryFulfilled, dispatch }) {
                    try {
                        const { data } = await queryFulfilled;
                        i18n.changeLanguage(data.lang);
                    } catch (error:any) {
                        if (error?.status === 404) {
                            const payload = {
                                id: userId,
                                userId,
                                theme: 'app_light_theme',
                                lang: 'en',
                                currency: 'RUB',
                            };
                            const action = settingsApi.endpoints.createSettings.initiate(payload);
                            try {
                                await dispatch(action).unwrap();
                                i18n.changeLanguage(payload.lang);
                            } catch (createErr: any) {
                                console.log(createErr);
                            }
                        }
                    }
                },

            }),
            createSettings: build.mutation({
                query: (settings) => ({
                    url: '/userSettings',
                    method: 'POST',
                    body: { id: settings.userId, ...settings },
                }),
                invalidatesTags: (_res, _err, { userId }) => [{ type: 'Settings', id: userId }],
            }),
            updateSettings: build.mutation({
                query: (settings) => ({
                    url: `/userSettings/${settings.userId}`,
                    method: 'PATCH',
                    body: settings,
                }),
                invalidatesTags: (_res, _err, { userId }) => [{ type: 'Settings', id: userId }],

                async onQueryStarted(_arg, { queryFulfilled }) {
                    try {
                        const { data } = await queryFulfilled;
                        i18n.changeLanguage(data.lang);
                        localStorage.setItem(LOCAL_STORAGE_THEME_KEY, _arg.theme);
                    } catch (error:any) {
                        console.log(error);
                    }
                },

            }),

        }),
    });

export const { useGetSettingsDataQuery, useCreateSettingsMutation, useUpdateSettingsMutation } = settingsApi;
