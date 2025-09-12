import React, { Suspense, useEffect } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Theme, useTheme } from 'app/providers/ThemeProvider';
import { AppRouter } from 'app/providers/router';
import { Navbar } from 'widgets/Navbar';
import { Sidebar } from 'widgets/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInited, userActions } from 'entities/User';
import { getSettingsForm } from 'entities/Settings';

function App() {
    const dispatch = useDispatch();
    const { theme, changeTheme } = useTheme();
    const inited = useSelector(getUserInited);

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
                    <Sidebar />
                    {inited && <AppRouter />}
                </div>
            </Suspense>
        </div>
    );
}

export default App;
