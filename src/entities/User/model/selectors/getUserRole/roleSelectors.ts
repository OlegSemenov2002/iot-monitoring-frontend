import { StateSchema } from 'app/providers/StoreProvider';
import { createSelector } from '@reduxjs/toolkit';
import { getUserAuthData } from 'entities/User';
import { useSelector } from 'react-redux';
import { useGetByIdQuery } from 'entities/User/api/userApi';

export const selectAuthData = getUserAuthData;

export function useCurrentUser() {
    const auth = useSelector(selectAuthData);
    const skip = !auth?.id;
    const { data, isLoading } = useGetByIdQuery(auth!.id, { skip });
    return { user: data ?? null, isLoading };
}

export const selectRole = createSelector(
    (state: StateSchema) => (getUserAuthData(state)?.roles ?? []),
    (roles) => roles,
);
