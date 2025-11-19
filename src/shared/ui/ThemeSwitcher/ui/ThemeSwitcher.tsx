import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTheme } from 'app/providers/ThemeProvider';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Theme } from 'shared/const/ThemeTypes';

import LightIcon from 'shared/assets/icons/theme-light.svg';
import DarkIcon from 'shared/assets/icons/theme-dark.svg';
import MiddleIcon from 'shared/assets/icons/theme-middle.svg';
import { LOCAL_STORAGE_THEME_KEY } from 'shared/const/localstorage';
import cls from './ThemeSwitcher.module.scss';

interface ThemeSwitcherProps {
    className?: string;
}

interface ThemeSwitcherProps {
    className?: string;
}

export const ThemeSwitcher = memo(({ className }: ThemeSwitcherProps) => {
    const { theme, toggleTheme } = useTheme();

    let newTheme: Theme;
    let result;

    switch (theme) {
    case Theme.DARK:
        result = <LightIcon />;
        break;
    case Theme.LIGHT:
        result = <MiddleIcon />;

        break;
    case Theme.MIDDLE:
        result = <DarkIcon />;

        break;

    default: newTheme = Theme.LIGHT;
    }

    return (
        <Button
            theme={ButtonTheme.CLEAR}
            className={classNames('', {}, [className])}
            onClick={toggleTheme}
        >
            {result}
        </Button>
    );
});
