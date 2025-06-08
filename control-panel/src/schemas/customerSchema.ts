export default interface CustomerSchema {
	_id: string;
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	address: string;
}
export type CustomerFormInputs = {
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	address: string;
}
