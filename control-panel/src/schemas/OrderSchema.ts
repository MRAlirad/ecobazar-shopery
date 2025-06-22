import CustomerSchema from './customerSchema';

export default interface OrderSchema {
	_id: string;
	products: [];
	status: 'pending' | 'sending' | 'finish' | 'cancel';
	customer: CustomerSchema;
	description: string;
}

export type OrderFormInputs = {
	products: [];
	status: 'pending' | 'sending' | 'finish' | 'cancel';
	customer: string;
	description: string;
};
