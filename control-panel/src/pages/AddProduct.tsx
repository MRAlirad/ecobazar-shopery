import ProductForm from '../components/product/ProductForm';
import { useAddProduct } from '../hooks/api';

const AddProduct = () => {
	const addProduct = useAddProduct({});

	return (
		<main className="page">
			<h1>Add Product</h1>
			<ProductForm
				mode="ADD"
				onAdd={data => addProduct.mutate(data)}
				isAdding={addProduct.isPending}
			/>
		</main>
	);
};

export default AddProduct;
