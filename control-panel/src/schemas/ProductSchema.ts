export default interface ProductSchema {
	id?: number;
	title: string;
	description: string;
	images: string[];
	price: number;
	discount: number;
	count: number;
	status: number;
	// category: number;
	// tag: string;
}
