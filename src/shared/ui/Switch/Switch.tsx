import { FC } from 'react';
import cls from './Switch.module.scss'; // Или Tailwind для стилей
import {classNames, Mods} from 'shared/lib/classNames/classNames';


export const SWITCH_SIZE = {
    BIG: 'big',
    MINIMAL: 'minimal',
} as const;

export type SwitchSize= typeof SWITCH_SIZE[keyof typeof SWITCH_SIZE];




interface SwitchProps {
    size?:SwitchSize;
    checked?: boolean;
    onChange: (checked: boolean) => void;
    disabled?: boolean;
    className?: string;
}

export const Switch: FC<SwitchProps> = (props:SwitchProps) => {
    const {
        size = SWITCH_SIZE.MINIMAL,
        checked,
        onChange,
        disabled,
        className
    } = props;

    const mods: Mods = {
        [cls[size]]: true,
    };


    return (
        <label className={classNames(cls.Switch, { [cls.disabled]: disabled }, [className])}>
            <input
                type="checkbox"
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
                disabled={disabled}
                aria-checked={checked}
            />
            <span className={classNames(cls.slider, {}, [className])} /> {}
        </label>
    )
};

