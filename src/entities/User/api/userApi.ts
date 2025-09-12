import { rtkApi } from 'shared/api/rtkApi';
import { User } from 'entities/User';

export const userApi = rtkApi
    .enhanceEndpoints({ addTagTypes: ['User'] })
    .injectEndpoints({
        endpoints: (build) => ({
            getById: build.query<User, string>({
                query: (id) => ({ url: `/users/${id}` }),
                providesTags: (res, _e, id) => [{ type: 'User', id }],
            }),
        }),
    });

export const { useGetByIdQuery } = userApi;
