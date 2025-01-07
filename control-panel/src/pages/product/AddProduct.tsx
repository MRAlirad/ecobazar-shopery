import { useNavigate } from 'react-router';
import { useAddProduct } from '../../hooks/api';
import ProductForm from '../../components/product/ProductForm';

const AddProduct = () => {
	const navigate = useNavigate();
	const addProduct = useAddProduct({
		successToast: 'Product added successfully',
		onAdd: () => navigate('/product/list'),
	});

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
