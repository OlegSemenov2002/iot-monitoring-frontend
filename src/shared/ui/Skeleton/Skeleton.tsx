import { classNames } from 'shared/lib/classNames/classNames';
import { CSSProperties, memo } from 'react';
import cls from './Skeleton.module.scss';

interface SkeletonProps {
    className?: string;
    height?: string | number;
    width?: string | number;
    border?: string;
    children?: React.ReactNode;
}

export const Skeleton = memo((props: SkeletonProps) => {
    const {
        className,
        height,
        width,
        border,
        children
    } = props;

    const styles: CSSProperties = {
        width,
        height,
        borderRadius: border,
    };

    return (
        <div
            className={classNames(cls.Skeleton, {}, [className])}
            style={styles}
        >{children}
        </div>
    );
});
