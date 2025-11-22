/* i18next-extract-disable-file */

import { classNames } from 'shared/lib/classNames/classNames';





import {
    memo, useCallback, useMemo, useState,
} from 'react';
import { ThemeSwitcher } from 'shared/ui/ThemeSwitcher';
import { LangSwitcher } from 'shared/ui/LangSwitcher/LangSwitcher';
import { Button, ButtonSize, ButtonTheme } from 'shared/ui/Button/Button';
import { useSelector } from 'react-redux';
import { getUserAuthData, ROLE_DISPLAY_NAMES, selectMainRole } from 'entities/User';
import { SidebarHeader } from 'widgets/Sidebar/ui/SidebarHeader/SidebarHeader';
import { Profile} from 'entities/Profile';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Loader } from 'lucide-react';


import { SidebarItem } from '../SidebarItem/SidebarItem';
import { SidebarItemsList } from '../../model/items';
import cls from './Sidebar.module.scss';
import {useTranslation} from "react-i18next";

interface SidebarProps {
    className?: string;
    profile?: Profile;
}

export const Sidebar = memo(({ className, profile }: SidebarProps) => {
    const [collapsed, setCollapsed] = useState(false);
    const { t } = useTranslation();



    const mainRole = useSelector(selectMainRole);
    const mainRoleName = ROLE_DISPLAY_NAMES[mainRole];

    const onToggle = useCallback(() => {
        setCollapsed((prev) => !prev);
    }, [setCollapsed]);

    const itemsList = useMemo(() => SidebarItemsList.map((item) => (
        <SidebarItem
            item={item}
            collapsed={collapsed}
            key={item.path}
        />
    )), [collapsed]);


    return (

        <menu
            data-testid="sidebar"
            className={classNames(cls.Sidebar, { [cls.collapsed]: collapsed }, [className])}
        >
            <SidebarHeader
                profile={profile}
                mainRoleName={t(mainRoleName)} /* i18next-extract-disable-line */
                collapsed={collapsed}
            />
            <Button
                data-testid="sidebar-toggle"
                onClick={onToggle}
                className={cls.collapseBtn}
                theme={ButtonTheme.BACKGROUND_INVERTED}
                size={ButtonSize.L}
                square
            >
                {collapsed ? '>' : '<'}
            </Button>
            <div className={cls.items}>
                {itemsList}
            </div>
            <div className={cls.switchers}>
                <ThemeSwitcher />
                <LangSwitcher
                    short={collapsed}
                    className={cls.lang}
                />
            </div>
        </menu>
    );
});
