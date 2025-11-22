import React, { Suspense, useEffect } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Theme, useTheme } from 'app/providers/ThemeProvider';
import { AppRouter } from 'app/providers/router';
import { Navbar } from 'widgets/Navbar';
import { Sidebar } from 'widgets/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import {
    getUserId,
    getUserInited,
    userActions,
    UserRole,
} from 'entities/User';
import { getSettingsForm } from 'entities/Settings';
import { skipToken } from '@reduxjs/toolkit/query/react';
import { useGetProfileDataQuery } from 'entities/Profile';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localstorage';

function App() {
    const { theme, changeTheme } = useTheme();

    const dispatch = useDispatch();
    const inited = useSelector(getUserInited);
    const userId = useSelector(getUserId);

    const { data: profile } = useGetProfileDataQuery(
        userId ?? skipToken,
        {
            refetchOnMountOrArgChange: false,
            refetchOnReconnect: false,
            refetchOnFocus: false,
        },
    );

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const host = window.location.hostname;
            const isDemo = host.includes('vercel.app');

            if (isDemo) {
                const adminUser = {
                    id: '1',
                    username: 'admin',
                    roles: [UserRole.ADMIN],
                };

                try {
                    localStorage.setItem(
                        USER_LOCALSTORAGE_KEY,
                        JSON.stringify(adminUser),
                    );
                } catch (e) {
                    // если localStorage недоступен — просто игнор
                }
            }
        }

        dispatch(userActions.initAuthData());
    }, [dispatch]);

    const settingsTheme = useSelector(getSettingsForm)?.theme as Theme | undefined;

    useEffect(() => {
        if (settingsTheme && settingsTheme !== theme) {
            changeTheme(settingsTheme);
        }
    }, [settingsTheme, theme, changeTheme]);

    return (
        <div className={classNames('app', {}, [theme])}>
            <Suspense fallback="">
                <Navbar />
                <div className="content-page">
                    <Sidebar profile={profile} />
                    {inited && <AppRouter />}
                </div>
            </Suspense>
        </div>
    );
}

export default App;
