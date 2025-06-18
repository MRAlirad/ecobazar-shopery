import CategorySchema from './categorySchema';
export default interface ProductSchema {
	_id: string;
	title: string;
	description: string;
	images: string[];
	attributes: { label: string; value: string }[];
	price: number;
	discount: number;
	count: number;
	status: number;
	category: CategorySchema;
}

export type ProductFormInputs = {
	title: string;
	description: string;
	images: string[];
	attributes?: { label: string; value: string }[];
	price: number;
	discount: number;
	count: number;
	status: number;
	category: string;
};
