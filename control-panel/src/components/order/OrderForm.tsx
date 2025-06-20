import { FormProvider, useForm } from 'react-hook-form';
import Card from '../Card';
import Input from '../Input';
import Table from '../Table';

const OrderForm = () => {

	const formMethods = useForm();

	return (
		<FormProvider {...formMethods}>
			<form className="grid grid-cols-[2fr_1fr]">
				<div className="grid gap-4">
					<Card>
						<Table
							columns={[
								{ name: 'product', label: 'ProductName' },
								{ name: 'count', label: 'Count' },
								{ name: 'action', label: '' },
							]}
						/>
					</Card>
				</div>
			</form>
		</FormProvider>
	);
};

export default OrderForm;
