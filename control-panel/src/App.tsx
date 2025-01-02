import Header from './components/Header';
import Sidebar from './components/Sidebar';
import { Outlet } from 'react-router';
// import Select from './components/Select';
// import { FormProvider, useForm } from 'react-hook-form';
// import Button from './components/Button';
// import Input from './components/Input';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from 'yup';

function App() {
	// const formMethods = useForm({
	// 	resolver: yupResolver(
	// 		yup.object().shape({
	// 			country: yup.string().required(),
	// 			email: yup.string().email().required(),
	// 		})
	// 	),
	// 	defaultValues: {
	// 		country: '1',
	// 		email: 'test@gmail.com',
	// 	},
	// });
	return (
		<div className="grid grid-cols-[256px_1fr] grid-rows-[max-content_1fr] bg-white dark:bg-gray-900 min-h-screen">
			<Header />
			<Sidebar />
			<Outlet />
			{/* <FormProvider {...formMethods}>
				<form
					className="p-4 space-y-4"
					onSubmit={formMethods.handleSubmit(data => console.log(data))}
				>
					<Select
						label="shetopskey"
						name="country"
						options={[
							{
								value: 1,
								label: 'United States',
							},
							{
								value: 2,
								label: 'Iran',
							},
							{
								value: 3,
								label: 'United Kingdom',
							},
						]}
					/>
					<Input
						label="email"
						name="email"
					/>
					<Button
						text="submit"
						type="submit"
					/>
				</form>
			</FormProvider> */}
		</div>
	);
}

export default App;
