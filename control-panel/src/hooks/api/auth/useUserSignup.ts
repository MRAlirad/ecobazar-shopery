import usePost from '../usePost';
import apiConfig from '../apiConfig';
import { PostProps } from '../../../schemas/apiHookSchema';
import UserSchema, { SignupInputs } from '../../../schemas/userSchema';

const useUserSignup = ({ successToast, onSuccess }: PostProps<UserSchema>) => {
	const { path, queryKey } = apiConfig.user.signup;
	return usePost<SignupInputs, UserSchema>({ path, queryKey, successToast, onSuccess });
};

export default useUserSignup;
