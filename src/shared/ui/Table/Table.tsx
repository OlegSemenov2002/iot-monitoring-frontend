import { FC, ReactNode } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Table.module.scss';

interface TableProps {
    children: ReactNode;
    className?: string;
}

export const Table: FC<TableProps> = ({ children, className }) => (
    <table className={classNames(cls.tableAuto, {}, [className])}>
        {children}
    </table>
);
