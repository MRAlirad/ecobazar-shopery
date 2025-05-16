import { useNavigate } from 'react-router';
import { useAddProduct } from '../../hooks/api';
import Page from '../../components/Page';
import PageHeader from '../../components/PageHeader';
import ProductForm from '../../components/product/ProductForm';
import Breadcrumb from '../../components/Breadcrumb';
import { FaShoppingCart } from 'react-icons/fa';

const AddProduct = () => {
	const navigate = useNavigate();
	const addProduct = useAddProduct({
		successToast: 'Product added successfully',
		onAdd: () => navigate('/product'),
	});

	return (
		<Page type="form">
			<Breadcrumb
				type="home"
				breadcrumb={[{ label: 'Products List', icon: <FaShoppingCart />, link: '/product' }, { label: 'Add Product' }]}
			/>
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
