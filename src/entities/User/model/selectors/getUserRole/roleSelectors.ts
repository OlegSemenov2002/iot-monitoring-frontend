import { StateSchema } from 'app/providers/StoreProvider';
import { createSelector } from '@reduxjs/toolkit';
import {getUserAuthData, ROLE_PRIORITIES, UserRole} from 'entities/User';
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





export const selectMainRole = createSelector(
    [getUserAuthData],
    (authData): UserRole => {
        const roles = authData?.roles ?? [];

        if (roles.length === 0) return UserRole.GUEST; // ← GUEST, а не USER!
        if (roles.length === 1) return roles[0];

        return roles.reduce((highestRole, currentRole) => {
            const currentPriority = ROLE_PRIORITIES[currentRole] || 0;
            const highestPriority = ROLE_PRIORITIES[highestRole] || 0;

            return currentPriority > highestPriority ? currentRole : highestRole;
        }, roles[0]);
    }
);
