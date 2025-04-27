import { useNavigate } from 'react-router';
import { useAddProduct } from '../../hooks/api';
import Page from '../../components/Page';
import PageHeader from '../../components/PageHeader';
import ProductForm from '../../components/product/ProductForm';

const AddProduct = () => {
	const navigate = useNavigate();
	const addProduct = useAddProduct({
		successToast: 'Product added successfully',
		onAdd: () => navigate('/product'),
	});

	return (
		<Page type='form'>
			<PageHeader
				title="Add Product"
				backLink="/product"
			/>
			<ProductForm
				mode="ADD"
				onAdd={data => addProduct.mutate(data)}
				isAdding={addProduct.isPending}
			/>
		</Page>
	);
};

export default AddProduct;
