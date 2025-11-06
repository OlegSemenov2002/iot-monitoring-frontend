

import { MutableRefObject, useEffect, useRef } from 'react';

export interface UseInfiniteScrollOptions<T extends HTMLElement = HTMLElement> {
    callback?: () => void;
    triggerRef: MutableRefObject<T | null>;
    wrapperRef?: MutableRefObject<T | null>; // optional - если не передан, используем viewport
    disabled?: boolean;
    rootMargin?: string;
    threshold?: number;
}

export function useInfiniteScroll<T extends HTMLElement = HTMLElement>({
    callback,
    triggerRef,
    wrapperRef,
    disabled = false,
    rootMargin = '0px 0px 0px 0px',
    threshold = 0.1,
}: UseInfiniteScrollOptions<T>) {
    const observer = useRef<IntersectionObserver | null>(null);
    const inProgress = useRef(false);

    useEffect(() => {
        if (!callback) return;
        if (disabled) {

            return;
        }

        const triggerEl = triggerRef.current;
        const rootEl = wrapperRef?.current ?? null; // если wrapperRef не передан — root=null (viewport)

        console.log('[useInfiniteScroll] init', { triggerEl, rootEl, disabled, rootMargin, threshold });

        if (!triggerEl) {

            return;
        }

        observer.current = new IntersectionObserver(([entry]) => {

            if (entry.isIntersecting && !inProgress.current) {
                inProgress.current = true;
                try {
                    callback();
                } finally {
                    setTimeout(() => { inProgress.current = false; }, 500);
                }
            }
        }, {
            root: rootEl,
            rootMargin,
            threshold,
        });

        observer.current.observe(triggerEl);

        return () => {
            if (observer.current && triggerRef.current) {
                try { observer.current.unobserve(triggerRef.current); } catch {}
            }
            observer.current?.disconnect();
            observer.current = null;
        };
    }, [callback, disabled, rootMargin, threshold, triggerRef, wrapperRef]);
}
