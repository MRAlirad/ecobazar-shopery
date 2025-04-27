import { Link, useNavigate } from 'react-router';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useUserSignup } from '../../hooks/api';
import Card from '../../components/Card';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { EcobazarShoperyToken } from '../../helpers/Token';

type SignupInputs = {
	name: string;
	email: string;
	password: string;
};

const Signup = () => {
	const navigate = useNavigate();
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
		onSuccess: ({ token }) => {
			EcobazarShoperyToken('set', token);
			navigate('/');
			location.reload();
		},
	});

	return (
		<FormProvider {...formMethods}>
			<Card className="w-full max-w-sm z-10">
				<form
					className="grid gap-4"
					onSubmit={formMethods.handleSubmit(data => signup.mutate(data))}
				>
					<h5 className="text-xl font-medium">Sign up to our platform</h5>
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
					<div className="text-sm font-medium text-gray-500">
						Already registered?{' '}
						<Link
							to="/auth/login"
							className="text-blue-700 hover:underline"
						>
							Login to your account
						</Link>
					</div>
				</form>
			</Card>
		</FormProvider>
	);
};

export default Signup;
