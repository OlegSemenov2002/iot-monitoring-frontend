import { FC } from 'react';
import cls from './Switch.module.scss'; // Или Tailwind для стилей
import { classNames } from 'shared/lib/classNames/classNames';

interface SwitchProps {
    checked?: boolean;
    onChange: (checked: boolean) => void;
    disabled?: boolean;
    className?: string;
}

export const Switch: FC<SwitchProps> = ({ checked, onChange, disabled, className }) => (
    <label className={classNames(cls.Switch, {}, [className])}>
        <input
            type="checkbox"
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
            disabled={disabled}
            aria-checked={checked}
        />
        <span className="slider" /> {}
    </label>
);

