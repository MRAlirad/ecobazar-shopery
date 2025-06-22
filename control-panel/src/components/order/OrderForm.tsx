import { FormProvider, useForm } from 'react-hook-form';
import OrderProducts from './OrderProducts';
import OrderPayment from './OrderPayment';
import PageActionsBox from '../PageActionsBox';
import Card from '../Card';
import Textarea from '../Textarea';
import Select from '../Select';
import OrderCustomer from './OrderCustomer';
import { orderStatuses } from '../../values';

const OrderForm = ({ mode = 'ADD' }) => {
	const formMethods = useForm({
		defaultValues: {
			products: [],
			status: '',
			customer: '',
			description: '',
		},
	});

	return (
		<FormProvider {...formMethods}>
			<form className="grid grid-cols-[2fr_1fr] gap-6">
				<div className="grid gap-4 h-max">
					<OrderProducts />
					<OrderPayment />
				</div>
				<div className="grid gap-4 h-max">
					<Card>
						<Select name="status" label="Status" options={orderStatuses} clearable />
					</Card>
					<Card>
						<Textarea name="note" label="Description" />
					</Card>
					<OrderCustomer />
				</div>
				<PageActionsBox mode={mode} className="col-span-2" />
			</form>
		</FormProvider>
	);
};

export default OrderForm;
