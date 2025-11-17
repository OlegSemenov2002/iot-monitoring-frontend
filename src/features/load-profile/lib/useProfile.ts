import { useSelector } from 'react-redux';
import { getUserAuthData } from 'entities/User';
import { useGetProfileDataQuery } from 'entities/Profile';


export const useProfile = () => {
    const authData = useSelector(getUserAuthData);

    const queryResult = useGetProfileDataQuery(authData?.id!, {
        skip: !authData?.id,
    });

    return {
        profile: queryResult.data,
        isLoading: queryResult.isLoading,
        isError: queryResult.isError,
        error: queryResult.error,
        refetch: queryResult.refetch,
    };
};
