export enum UserRole{
    ADMIN ='ADMIN',
    USER = 'USER',
    MANAGER = 'MANAGER',
    GUEST = 'GUEST'

} export interface User {

    id: string;
    username: string;
    roles?:UserRole[];

}

export interface UserSchema {
    authData?: User;
    _inited: boolean;
}
