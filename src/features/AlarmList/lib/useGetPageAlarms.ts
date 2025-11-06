import {
    useEffect, useMemo, useRef, useState,
} from 'react';
import { useGetLastAlarmsPartlyByDeviceIdQuery } from 'shared/api/alarmApi';
import { Alarm } from 'entities/Alarm';

interface UsePageAlarmsOptions {
    deviceId: number;
    page?: number;
    limit?: number;
    enabled?: boolean;
}

interface UsePageAlarmsResult {
    data: Alarm[];
    isLoading: boolean;
    isFetching: boolean;
    error: any;
    page: number;
    hasMore: boolean;
    loadNext: () => void;
    reset: () => void;
    refetch: () => void;
}


export const usePageAlarms = ({
    deviceId,
    page: initialPage = 1,
    limit = 10,
    enabled = true,
}: UsePageAlarmsOptions): UsePageAlarmsResult => {
    const [page, setPage] = useState(initialPage);
    const [allData, setAllData] = useState<Alarm[]>([]);
    const [hasMore, setHasMore] = useState(true);
    const loadedPages = useRef<Set<number>>(new Set());

    const {
        data,
        isLoading,
        isFetching,
        error,
        refetch: queryRefetch,
    } = useGetLastAlarmsPartlyByDeviceIdQuery(
        { deviceId, page, n: limit },
        { skip: !enabled || !hasMore },
    );


    useEffect(() => {
        setAllData([]);
        setPage(initialPage);
        setHasMore(true);
        loadedPages.current.clear();
    }, [deviceId, initialPage]);

    useEffect(() => {
        if (data && !loadedPages.current.has(page)) {
            loadedPages.current.add(page);
            setAllData((prev) => [...prev, ...data]);
            if (data.length < limit) setHasMore(false);
        }
    }, [data, page, limit]);

    const loadNext = () => {

        if (!isFetching && hasMore) {
            console.log(page)
            setPage((p) => p + 1);
        }
    };

    const reset = () => {
        setAllData([]);
        setPage(initialPage);
        setHasMore(true);
        loadedPages.current.clear();
    };

    const refetch = () => {
        reset();
        queryRefetch();
    };

    const sortedData = useMemo(() => [...allData].sort(
        (a, b) => new Date(b.date_time).getTime() - new Date(a.date_time).getTime(),
    ), [allData]);

    return {
        data: sortedData,
        isLoading: isLoading && page === initialPage,
        isFetching,
        error,
        page,
        hasMore,
        loadNext,
        reset,
        refetch,
    };
};
