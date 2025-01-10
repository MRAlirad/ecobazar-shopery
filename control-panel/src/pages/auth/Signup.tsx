import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useUserSignup } from '../../hooks/api';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { Link } from 'react-router';

type SignupInputs = {
	name: string;
	email: string;
	password: string;
};

const Signup = () => {
	const formMethods = useForm<SignupInputs>({
		resolver: yupResolver(
			yup.object().shape({
				name: yup.string().trim().required('Title is a required field').min(5).max(50),
				email: yup.string().trim().required('Email is a required field').email('Email is not valid').min(5).max(255),
				password: yup.string().trim().required('Password is a required field').min(5).max(1024),
			})
		),
		defaultValues: {
			name: '',
			email: '',
			password: '',
		},
	});

	const signup = useUserSignup({
		successToast: 'User signed up successfully',
		onSuccess: data => console.log(data),
	});

	return (
		<FormProvider {...formMethods}>
			<form
				className="card w-full max-w-sm p-8 z-10"
				onSubmit={formMethods.handleSubmit(data => signup.mutate(data))}
			>
				<h5 className="text-xl font-medium text-gray-900 dark:text-white">Sign up to our platform</h5>
				<Input
					name="name"
					label="Your Name"
					placeholder="John Doe"
				/>
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
					text="sign up to your account"
					type="submit"
					fluid
					loading={signup.isPending}
				/>
				<div className="text-sm font-medium text-gray-500 dark:text-gray-300">
					Already registered?{' '}
					<Link
						to="/auth/login"
						className="text-blue-700 hover:underline dark:text-blue-500"
					>
						Login to your account
					</Link>
				</div>
			</form>
		</FormProvider>
	);
};

export default Signup;
