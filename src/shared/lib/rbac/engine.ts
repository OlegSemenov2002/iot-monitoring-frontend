import { UserRole } from 'entities/User';

import type { Resource, Action } from './actions';

export const isOwner = (
    ownerId?: string | number,
    userId?: string | number,
): boolean => {
    if (ownerId == null || userId == null) return false; // ловим null и undefined
    return String(ownerId) === String(userId);
};

export const SCOPES = {
    NONE: 'none',
    OWN: 'own',
    ANY: 'any',
} as const;

export type Role = UserRole;

export type Scope = typeof SCOPES[keyof typeof SCOPES];

export type Rule = Readonly<{ scope: Scope }>;

export type RolePolicies = Readonly<
    Partial<Record<Resource, Readonly<Partial<Record<Action, Rule>>>>>
>;

export type RBACMatrix = Readonly<Record<Role, RolePolicies>>;

export function can(
    params: {
        roles: readonly Role[];
        action: Action;
        resource: Resource;
        ownerId?: string | number;
        userId?: string | number;
    },
    RBAC: RBACMatrix,
): boolean {
    const {
        roles, action, resource, ownerId, userId,
    } = params;

    const scopes = roles
        .map((r) => RBAC[r]?.[resource]?.[action]?.scope)
        .filter((s): s is Scope => Boolean(s));

    if (scopes.length === 0) return false;

    if (scopes.includes(SCOPES.ANY)) return true;
    if (scopes.includes(SCOPES.NONE)) return true;
    if (scopes.includes(SCOPES.OWN)) return isOwner(ownerId, userId);

    return false;
}
