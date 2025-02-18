import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useUserLogin } from '../../hooks/api';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { Link, useNavigate } from 'react-router';
import { EcobazarShoperyToken } from '../../helpers/Token';

type LoginInputs = {
	email: string;
	password: string;
};

const Login = () => {
	const navigate = useNavigate();
	const formMethods = useForm<LoginInputs>({
		resolver: yupResolver(
			yup.object().shape({
				email: yup.string().trim().required('Email is a required field').email('Email is not valid').min(5).max(255),
				password: yup.string().trim().required('Password is a required field').min(5).max(1024),
			})
		),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const signup = useUserLogin({
		successToast: 'User signed up successfully',
		onSuccess: ({ token }) => {
			EcobazarShoperyToken('set', token);
			navigate('/');
			location.reload();
		},
	});

	return (
		<FormProvider {...formMethods}>
			<form
				className="card w-full max-w-sm p-8 z-10"
				onSubmit={formMethods.handleSubmit(data => signup.mutate(data))}
			>
				<h5 className="text-xl font-medium text-gray-900 dark:text-white">Log in to our platform</h5>
				<Input
					name="email"
					label="Your Email"
					placeholder="example@gmail.com"
				/>
				<Input
					name="password"
					label="Your Password"
					type="password"
					placeholder="**********"
				/>
				<Button
					text="login to your account"
					type="submit"
					fluid
					loading={signup.isPending}
				/>
				<div className="text-sm font-medium text-gray-500 dark:text-gray-300">
					Not registered?{' '}
					<Link
						to="/auth/signup"
						className="text-blue-700 hover:underline dark:text-blue-500"
					>
						create to your account
					</Link>
				</div>
			</form>
		</FormProvider>
	);
};

export default Login;
