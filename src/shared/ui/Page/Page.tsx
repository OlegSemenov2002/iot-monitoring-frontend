import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import {forwardRef, MutableRefObject, useRef} from 'react';
import { useInfiniteScroll } from 'shared/lib/hooks/useInfiniteScroll/useInfiniteScroll';
import cls from './Page.module.scss';

interface PageProps {
    className?: string;
    children: React.ReactNode;
    onScrollEnd?: () => void;
}

export const Page = forwardRef<HTMLDivElement, PageProps>((props, ref) => {
    const { children, className, onScrollEnd } = props;
    const triggerRef = useRef<HTMLDivElement | null>(null);
    const wrapperRef = (ref as MutableRefObject<HTMLDivElement | null>) || useRef<HTMLDivElement | null>(null);

    useInfiniteScroll({
        wrapperRef,
        triggerRef,
        callback: onScrollEnd,
    });

    return (
        <section
            ref={wrapperRef}
            className={classNames(cls.Page, {}, [className])}
        >
            {children}
            <div ref={triggerRef} />
        </section>
    );
});

Page.displayName = 'Page';
