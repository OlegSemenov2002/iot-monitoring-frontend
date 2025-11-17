export enum UserRole{
    ADMIN ='ADMIN',
    USER = 'USER',
    MANAGER = 'MANAGER',
    GUEST = 'GUEST'

}

export const ROLE_PRIORITIES: Record<UserRole, number> = {
    [UserRole.ADMIN]: 100,
    [UserRole.MANAGER]: 80,
    [UserRole.USER]: 60,
    [UserRole.GUEST]: 20,
};

export const ROLE_DISPLAY_NAMES = {
    [UserRole.ADMIN]: 'Administrator',
    [UserRole.MANAGER]: 'Manager',
    [UserRole.USER]: 'User',
    [UserRole.GUEST]: 'Guest',
} as const;

export interface User {
    id: string;
    username: string;
    roles?:UserRole[];



}

export interface UserSchema {
    authData?: User;
    _inited: boolean;
}
