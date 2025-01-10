export default interface CategorySchema {
	_id: string;
	title: string;
	description: string;
}

export type CategoryFormInputs = {
	title: string;
	description: string;
};