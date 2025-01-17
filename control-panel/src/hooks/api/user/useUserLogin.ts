import usePost from '../usePost';
import apiConfig from '../apiConfig';
import { PostProps } from '../../../schemas/apiHookSchema';
import UserSchema, { LoginInputs } from '../../../schemas/userSchema';

const useUserLogin = ({ successToast, onSuccess }: PostProps<UserSchema & { token: string }>) => {
	const { path, queryKey } = apiConfig.user.login;
	return usePost<LoginInputs, UserSchema & { token: string }>({ path, queryKey, successToast, onSuccess });
};

export default useUserLogin;
