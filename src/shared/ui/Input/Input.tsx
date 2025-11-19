import { classNames, Mods } from 'shared/lib/classNames/classNames';
import React, {
    InputHTMLAttributes, memo, useEffect, useRef, useState,
} from 'react';
import cls from './Input.module.scss';
import {SENSOR_CARD_VIEWS} from "entities/Sensor/ui/SensorCard/SensorCard";

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'readOnly'>

export const INPUT_VIEWS = {
    CODE: 'code',
    IOT: 'iot',
} as const;


export type InputView = typeof INPUT_VIEWS[keyof typeof INPUT_VIEWS];


interface InputProps extends HTMLInputProps {
    className?: string;
    value?: string | number;
    onChange?: (value: string) => void;
    autofocus?: boolean;
    readonly?: boolean;
    view?:InputView;
}

export const Input = memo((props: InputProps) => {
    const {
        className,
        value,
        onChange,
        type = 'text',
        placeholder,
        autofocus,
        readonly,
        view = INPUT_VIEWS.CODE,
        ...otherProps
    } = props;

    const ref = useRef<HTMLInputElement>(null);
    const [isFocused, setIsFocused] = useState(false);
    const [caretPosition, setCaretPosition] = useState(0);

    const isCaretVisible = isFocused && !readonly && view === INPUT_VIEWS.CODE;

    useEffect(() => {
        if (autofocus) {
            setIsFocused(true);
            ref.current?.focus();
        }
    }, [autofocus]);

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value);
        if (view === INPUT_VIEWS.CODE) {
            setCaretPosition(e.target.selectionStart ?? e.target.value.length);
        }
    };

    const onBlur = () => {
        setIsFocused(false);
    };

    const onFocus = () => {
        setIsFocused(true);
    };

    const onSelect = (e: React.SyntheticEvent<HTMLInputElement>) => {
        if (view === INPUT_VIEWS.CODE) {
            setCaretPosition(e.currentTarget.selectionStart || 0);
        }
    };

    const mods: Mods = {
        [cls.readonly]: readonly,
        [cls[view]]: true,
    };

    // === РЕНДЕР ДЛЯ CODE ===
    if (view === INPUT_VIEWS.CODE) {
        return (
            <div className={classNames(cls.InputWrapper, mods, [className])}>
                {placeholder && (
                    <div className={cls.placeholder}>
                        {`${placeholder}>`}
                    </div>
                )}
                <div className={cls.caretWrapper}>
                    <input
                        ref={ref}
                        type={type}
                        value={value}
                        onChange={onChangeHandler}
                        className={cls.input}
                        onFocus={onFocus}
                        onBlur={onBlur}
                        onSelect={onSelect}
                        readOnly={readonly}
                        {...otherProps}
                    />
                    {isCaretVisible && (
                        <span
                            className={cls.caret}
                            style={{ left: `${caretPosition * 9}px` }}
                        />
                    )}
                </div>
            </div>
        );
    }


    return (
        <div className={classNames(cls.InputWrapper, mods, [className])}>

            <div className={cls.noneWrapper}>
                <input
                    ref={ref}
                    type={type}
                    value={value}
                    onChange={onChangeHandler}
                    className={cls.input}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onSelect={onSelect}
                    readOnly={readonly}
                    {...otherProps}
                />
                {isCaretVisible && (
                    <span
                        className={cls.caret}
                        style={{ left: `${caretPosition * 9}px` }}
                    />
                )}
            </div>
        </div>
    );
});
