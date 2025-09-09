import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Select } from 'shared/ui/Select/Select';
import { memo, useCallback } from 'react';
import { Country } from 'entities/Country';
import { AppLang } from 'entities/Settings/model/types/settings';
import { LOCAL_STORAGE_CURRENCY_KEY } from 'shared/const/localstorage';

interface CountrySelectProps {
    className?: string;
    value?: AppLang;
    onChange?: (value: AppLang) => void;
    readonly?: boolean;
}

const options = [
    { value: AppLang.EN, content: AppLang.EN },
    { value: AppLang.RU, content: AppLang.RU },

];

export const LangSelect = memo(({
    className, value, onChange, readonly,
}: CountrySelectProps) => {
    const { t } = useTranslation();

    const onChangeHandler = useCallback((value: string) => {
        onChange?.(value as AppLang);
    }, [onChange]);

    return (
        <Select
            className={classNames('', {}, [className])}
            label={t('Укажите язык')}
            options={options}
            value={value}
            onChange={onChangeHandler}
            readonly={readonly}
        />
    );
});
