import React, { useState, useEffect } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './DateRangePicker.module.scss';
import {useTranslation} from "react-i18next";

export type DateRange = { from: string; to: string }; // Общий тип, только from/to (без lastDays, чтобы не привязываться к фиче)

interface DateRangePickerProps {
    initialRange?: DateRange;
    onChange: (newRange: DateRange) => void;
    className?: string;
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
    initialRange = { from: '', to: '' },
    onChange,
    className,
}) => {
    const { t } = useTranslation();
    const [fromDate, setFromDate] = useState(initialRange.from || '');
    const [toDate, setToDate] = useState(initialRange.to || '');
    const [error, setError] = useState('');

    useEffect(() => {
        if (fromDate && toDate && new Date(toDate) < new Date(fromDate)) {
            setError('Конец диапазона должен быть позже начала');
        } else {
            setError('');
            if (fromDate && toDate) {
                onChange({ from: fromDate, to: toDate });
            }
        }
    }, [fromDate, toDate, onChange]);

    return (
        <div className={classNames(cls.DateRangePicker, {}, [className])}>
            <label>
                {t('From')+':'}
                <input
                    type="date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    max={toDate}
                />
            </label>
            <label>
                {t('To')+':'}
                <input
                    type="date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    min={fromDate}
                />
            </label>
            {error && <span className={cls.Error}>{error}</span>}
        </div>
    );
};
