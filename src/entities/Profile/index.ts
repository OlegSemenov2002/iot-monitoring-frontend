export {
    Profile,
    ProfileSchema,
} from './model/types/profile';

export {
    profileActions,
    profileReducer,
} from './model/slice/profileSlice';

export {
    useGetProfileDataQuery,
    useUpdateProfileMutation,
} from './api/profileApi';

export {
    ProfileCard,
} from './ui/ProfileCard/ProfileCard';

export { getProfileReadonly } from './model/selectors/getProfileReadonly/getProfileReadonly';
export { getProfileForm } from './model/selectors/getProfileForm/getProfileForm';
