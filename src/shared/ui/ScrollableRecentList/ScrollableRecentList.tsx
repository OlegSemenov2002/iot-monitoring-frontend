import React from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import { ScrollableContainer } from 'shared/ui/ScrollableContainer/ScrollableContainer';
import cls from './ScrollableRecentList.module.scss';

interface ScrollableRecentListProps<T> {
  className?: string;
  title: string;
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  maxItems?: number;
  isLoading?: boolean;
  height?: number;
}

export const ScrollableRecentList = <T, >({
    className,
    title,
    items,
    renderItem,
    maxItems = 10,
    isLoading = false,
    height = 300,
}: ScrollableRecentListProps<T>) => {
    const limitedItems = items.slice(0, maxItems);

    return (
        <div className={classNames(cls.ScrollableRecentList, {}, [className])}>
            <h3 className={cls.Title}>{title}</h3>
            <ScrollableContainer height={height}>
                {isLoading ? (
                    Array.from({ length: maxItems }).map((_, index) => (
                        <Skeleton key={index} height={40} className={cls.ItemSkeleton} />
                    ))
                ) : limitedItems.length > 0 ? (
                    limitedItems.map((item, index) => (
                        <div key={index} className={cls.Item}>
                            {renderItem(item, index)}
                        </div>
                    ))
                ) : (
                    <p className={cls.Empty}>Нет элементов</p>
                )}
            </ScrollableContainer>
        </div>
    );
};
