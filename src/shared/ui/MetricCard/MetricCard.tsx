import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import ProgressCircle from 'shared/ui/ProgressCircle/ProgressCircle';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import cls from './MetricCard.module.scss';

interface MetricCardProps {
    className?: string;
    icon?: React.ReactNode;
    title?: string;
    value?: number;
    maxValue?: number;
    subtitle?: string | number;
    increase?: string | number;
    loading?: boolean;

}
export const MetricCard: React.FC<MetricCardProps> = ({
    className,
    icon,
    title = 'Metric card title',
    value = 0,
    maxValue = 100,
    increase,
    loading,
}) => {


    const CARD_WIDTH = 340;
    const CARD_HEIGHT = 130;

    if (loading) {
        return (
            <Skeleton
                width={`${CARD_WIDTH}px`}
                height={`${CARD_HEIGHT}px`}
            />
        );
    }

    const progress = value ? Math.min(value / maxValue, 1) : 0;

    return (
        <div
            className={classNames(cls.MetricCard, {}, [className])}
            style={{ width: CARD_WIDTH, height: CARD_HEIGHT }}
        >
            <div className={cls.TopRow}>
                <div className={cls.IconTitle}>
                    {icon && <div className={cls.Icon}>{icon}</div>}
                    <div className={cls.Title}>{title}</div>
                </div>
                <div className={cls.CircleWrapper}>
                    <ProgressCircle progress={progress} size={50} strokeWidth={6} />
                </div>
            </div>
            <div className={cls.BottomRow}>
                <div className={cls.Subtitle}>{value}/{maxValue}</div>
                {increase !== undefined && (
                    <div className={cls.Increase}>{increase}</div>
                )}
            </div>
        </div>
    );
};
