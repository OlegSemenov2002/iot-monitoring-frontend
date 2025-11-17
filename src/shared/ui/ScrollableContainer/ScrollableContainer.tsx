import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import cls from './ScrollableContainer.module.scss';

interface ScrollableContainerProps {
    className?: string;
    children: React.ReactNode;
    height?: number; // px
}

export const ScrollableContainer: React.FC<ScrollableContainerProps> = ({
    className,
    children,
    height = 300,
}: ScrollableContainerProps) => {
    const { t } = useTranslation();

    return (
        <div
            className={classNames(cls.ScrollableContainer, {}, [className])}
            style={{ height: `${height}px` }}
        >
            {children}
        </div>
    );
};
