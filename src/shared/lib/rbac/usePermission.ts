import { useSelector } from 'react-redux';
import { getUserAuthData, UserRole } from 'entities/User';
import { can } from './engine';
import { RBAC } from './registry';
import type { Action, Resource } from './actions';

export function usePermission(params: {
    action: Action;
    resource: Resource;
    ownerId?: string | number;
}) {
    const auth = useSelector(getUserAuthData); // { id, roles } | null
    const roles = (auth?.roles?.length ? auth.roles : [UserRole.GUEST]) as readonly UserRole[];
    return can(
        {
            roles,
            action: params.action,
            resource: params.resource,
            ownerId: params.ownerId,
            userId: auth?.id,
        },
        RBAC,
    );
}
