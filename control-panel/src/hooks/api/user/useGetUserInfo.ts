import useGet from '../useGet';
import apiConfig from '../apiConfig';
import UserSchema from '../../../schemas/userSchema';

const useGetUserInfo = () => {
	const { path, queryKey } = apiConfig.user.info;
	return useGet<UserSchema>({ path, queryKey });
};

export default useGetUserInfo;
