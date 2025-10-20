import { RouteProps } from 'react-router-dom';
import { MainPage } from 'pages/MainPage';
import { AboutPage } from 'pages/AboutPage';
import { NotFoundPage } from 'pages/NotFoundPage';
import { ProfilePage } from 'pages/ProfilePage';
import { SettingsPage } from 'pages/SettingsPage';
import { AdminPanelPage } from 'pages/AdminPanelPage';
import { UserRole } from 'entities/User';
import {SensorsListPage} from "pages/SensorsListPage";
import {SensorDetailsPage} from "pages/SensorDetailsPage";



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
    SENSORS= 'sensors',
    SENSOR_DETAILS = 'sensor_details',
    // last
    NOT_FOUND = 'not_found',
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.ABOUT]: '/about',
    [AppRoutes.PROFILE]: '/profile',
    [AppRoutes.SETTINGS]: '/settings',
    [AppRoutes.ADMIN_PANEL]: '/admin',
    [AppRoutes.SENSORS]: '/sensors',
    [AppRoutes.SENSOR_DETAILS]: '/sensors/',
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
        authOnly: true,
    },
    [AppRoutes.PROFILE]: {
        path: RoutePath.profile,
        element: <ProfilePage />,
        authOnly: true,
    },
    [AppRoutes.SETTINGS]: {
        path: RoutePath.settings,
        element: <SettingsPage />,

    },
    [AppRoutes.ADMIN_PANEL]: {
        path: RoutePath.admin_panel,
        element: <AdminPanelPage />,
        authOnly: true,
        roles: [UserRole.MANAGER, UserRole.ADMIN],
    },
    [AppRoutes.SENSORS]: {
        path: RoutePath.sensors,
        element: <SensorsListPage />,
        authOnly: true,
    },
    [AppRoutes.SENSOR_DETAILS]: {
        path: `${RoutePath.sensor_details}:id`,
        element: <SensorDetailsPage />,
        authOnly: true,
    },
    // last
    [AppRoutes.NOT_FOUND]: {
        path: RoutePath.not_found,
        element: <NotFoundPage />,
    },
};
