import React from 'react';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import AboutIcon from 'shared/assets/icons/about-20-20.svg';
import MainIcon from 'shared/assets/icons/main-20-20.svg';
import ProfileIcon from 'shared/assets/icons/profile-20-20.svg';
import SensorsIcon from 'shared/assets/icons/sensors-20-20.svg';
import CompIcon from 'shared/assets/icons/computer.svg';
import ProfileCircle from 'shared/assets/icons/profile-circle.svg';


export interface SidebarItemType {
    path: string;
    text: string;
    Icon: React.VFC<React.SVGProps<SVGSVGElement>>;
    authOnly?: boolean;
}

export const SidebarItemsList: SidebarItemType[] = [

    {
        path: RoutePath.main,
        Icon: MainIcon,
        text: 'Main',
    },
    // {
    //     path: RoutePath.about,
    //     Icon: AboutIcon,
    //     text: 'О сайте',
    // },
    {
        path: RoutePath.sensors,
        Icon: CompIcon,
        text: 'Sensors',
        authOnly: true,
    },
    {
        path: RoutePath.profile,
        Icon: ProfileCircle,
        text: 'Profile',
        authOnly: true,
    },

    // {
    //     path: RoutePath.profile,
    //     Icon: ProfileIcon,
    //     text: 'Профиль',
    //     authOnly: true,
    // },
];
