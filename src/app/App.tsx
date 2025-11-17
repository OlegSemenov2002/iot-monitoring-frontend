import React, {Suspense, useEffect, useRef} from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Theme, useTheme } from 'app/providers/ThemeProvider';
import { AppRouter } from 'app/providers/router';
import { Navbar } from 'widgets/Navbar';
import { Sidebar } from 'widgets/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import {getUserAuthData, getUserId, getUserInited, userActions} from 'entities/User';
import { getSettingsForm } from 'entities/Settings';
import { skipToken } from '@reduxjs/toolkit/query/react';
import {useGetProfileDataQuery} from "entities/Profile";

function App() {

    const { theme, changeTheme } = useTheme();


    const dispatch = useDispatch();
    const inited = useSelector(getUserInited);









    const userId = useSelector(getUserId);

    const { data: profile } = useGetProfileDataQuery(
        userId ?? skipToken, // ⚡️ запрос только если userId есть
        {
            refetchOnMountOrArgChange: false,
            refetchOnReconnect: false,
            refetchOnFocus: false
        }
    );

    useEffect(() => {
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
                    <Sidebar profile={profile}/>
                    {inited && <AppRouter />}
                </div>
            </Suspense>
        </div>
    );
}

export default App;
