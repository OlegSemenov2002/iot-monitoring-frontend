import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localstorage';

export const rtkApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: __API__, // укажите ваш базовый URL
        prepareHeaders: (headers) => {
            const token = localStorage.getItem(USER_LOCALSTORAGE_KEY);
            if (token) {
                headers.set('authorization', token);
            }
            return headers;
        },
    }),
    endpoints: () => ({}),
});
