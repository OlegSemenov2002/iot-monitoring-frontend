import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localstorage';
import {UserSchema, User, UserRole} from '../types/user';

const demoAdmin: User = {
    id: '1',
    username: 'admin',
    roles: [UserRole.ADMIN],
};

const initialState: UserSchema = {
    authData: demoAdmin,
    _inited: true,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAuthData: (state, action: PayloadAction<User>) => {
            state.authData = action.payload;
            try {
                localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(action.payload));
            } catch {
            }
        },
        initAuthData: (state) => {
            state.authData = demoAdmin;
            try {
                localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(demoAdmin));
            } catch {
            }
            state._inited = true;
        },
        logout: (state) => {
            state.authData = undefined;
            try {
                localStorage.removeItem(USER_LOCALSTORAGE_KEY);
            } catch {
            }
        },
    },
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
