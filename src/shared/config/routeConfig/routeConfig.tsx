import { RouteProps } from 'react-router-dom';
import { MainPage } from 'pages/MainPage';
import { AboutPage } from 'pages/AboutPage';
import { NotFoundPage } from 'pages/NotFoundPage';
import { ProfilePage } from 'pages/ProfilePage';
import { SettingsPage } from 'pages/SettingsPage';
import { AdminPanelPage } from 'pages/AdminPanelPage';
import { UserRole } from 'entities/User';
import {SensorPage} from "pages/SensorPage";

export type AppRoutesProps = RouteProps & {
    authOnly?: boolean;
    roles?:UserRole[];
}

export enum AppRoutes {
    MAIN = 'main',
    ABOUT = 'about',
    PROFILE = 'profile',
    SETTINGS = 'settings',
    ADMIN_PANEL = 'admin_panel',
    SENSOR= 'sensor',
    // last
    NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.ABOUT]: '/about',
    [AppRoutes.PROFILE]: '/profile',
    [AppRoutes.SETTINGS]: '/settings',
    [AppRoutes.ADMIN_PANEL]: '/admin',
    [AppRoutes.SENSOR]: '/sensor',
    // последний
    [AppRoutes.NOT_FOUND]: '*',
};

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
    [AppRoutes.MAIN]: {
        path: RoutePath.main,
        element: <MainPage />,
    },
    [AppRoutes.ABOUT]: {
        path: RoutePath.about,
        element: <AboutPage />,
    },
    [AppRoutes.PROFILE]: {
        path: RoutePath.profile,
        element: <ProfilePage />,
        authOnly: true,
    },
    [AppRoutes.SETTINGS]: {
        path: RoutePath.settings,
        element: <SettingsPage />,
        authOnly: true,
    },
    [AppRoutes.ADMIN_PANEL]: {
        path: RoutePath.admin_panel,
        element: <AdminPanelPage />,
        authOnly: true,
        roles: [UserRole.MANAGER, UserRole.ADMIN],
    },
    [AppRoutes.SENSOR]: {
        path: RoutePath.sensor,
        element: <SensorPage />,
        authOnly: true,
    },
    // last
    [AppRoutes.NOT_FOUND]: {
        path: RoutePath.not_found,
        element: <NotFoundPage />,
    },
};
