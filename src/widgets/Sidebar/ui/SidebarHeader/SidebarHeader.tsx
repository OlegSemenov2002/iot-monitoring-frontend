import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import {Text, TextAlign, TextTheme} from 'shared/ui/Text/Text';
import { useSelector } from 'react-redux';
import { Profile } from 'entities/Profile';
import { ROLE_DISPLAY_NAMES, selectMainRole } from 'entities/User';
import { Loader } from 'lucide-react';
import cls from './SidebarHeader.module.scss';
import {AppLink} from "shared/ui/AppLink/AppLink";
import {RoutePath} from "shared/config/routeConfig/routeConfig";
import {memo} from "react";

interface SidebarHeaderProps {
    className?: string;
    profile?: Profile;
    mainRoleName: string;
    collapsed: boolean;
}

export const SidebarHeader = memo(({
    className,
    profile,
    mainRoleName,
    collapsed,
}: SidebarHeaderProps) => {
    const { t } = useTranslation();

    if (!profile) {

        return (
            <div className={classNames(cls.SidebarHeader, {}, [className])}>
            </div>
        );


    }

    if (collapsed) {
        return (
            <div className={classNames(cls.SidebarHeader, {}, [className])}>
              <AppLink to={RoutePath.profile} className={cls.miniLink}>
                <Avatar
                    src={profile.avatar}
                    size={50}
                    className={cls.miniavatar}
                />
            </AppLink>
            </div>
        );
    }

    return (
        <div className={classNames(cls.SidebarHeader, {}, [className])}>
            <Text className={cls.Role} text={mainRoleName}/>
            <AppLink to={RoutePath.profile} className={cls.profileLink}>
                <Avatar
                    src={profile.avatar}
                    className={cls.avatar}
                />
            </AppLink>
            <div className={cls.info}>
                <Text
                    theme={TextTheme.INVERTED}
                    title={`${profile.first} ${profile.lastname}`}
                    className={cls.name}
                />

                {profile.position && (
                    <Text
                        theme={TextTheme.INVERTED}
                        text={t(profile.position)}
                        className={cls.role}
                        align={TextAlign.CENTER}
                    />
                )}


            </div>
        </div>
    );
});
