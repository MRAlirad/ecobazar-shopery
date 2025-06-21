import { FormProvider, useForm } from 'react-hook-form';
import OrderProducts from './OrderProducts';
import OrderPayment from './OrderPayment';

const OrderForm = () => {
	const formMethods = useForm({
		defaultValues: {
			products: [],
		},
	});

	return (
		<FormProvider {...formMethods}>
			<form className="grid grid-cols-[2fr_1fr]">
				<div className="grid gap-4">
					<OrderProducts />
					<OrderPayment />
				</div>
			</form>
		</FormProvider>
	);
};

export default OrderForm;
