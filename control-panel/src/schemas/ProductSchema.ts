import CategorySchema from "./categorySchema";
export default interface ProductSchema {
	_id: string;
	title: string;
	description: string;
	images: string[];
	price: number;
	discount: number;
	count: number;
	status: number;
	category: CategorySchema;
	// tag: string;
}