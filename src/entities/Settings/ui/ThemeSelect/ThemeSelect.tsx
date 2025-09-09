import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Select } from 'shared/ui/Select/Select';
import { memo, useCallback } from 'react';
import { Theme } from 'shared/const/ThemeTypes';

interface CountrySelectProps {
    className?: string;
    value?: Theme;
    onChange?: (value: Theme) => void;
    readonly?: boolean;
}

const options = [
    { value: Theme.DARK, content: 'Темная' },
    { value: Theme.LIGHT, content: 'Светлая' },

];

export const ThemeSelect = memo(({
    className, value, onChange, readonly,
}: CountrySelectProps) => {
    const { t } = useTranslation();

    const onChangeHandler = useCallback((value: string) => {
        onChange?.(value as Theme);
    }, [onChange]);

    return (
        <Select
            className={classNames('', {}, [className])}
            label={t('Тема')}
            options={options}
            value={value}
            onChange={onChangeHandler}
            readonly={readonly}
        />
    );
});
