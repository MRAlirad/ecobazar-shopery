import { useNavigate } from 'react-router';
import { useParams } from 'react-router';
import { useGetProduct, useEditProduct } from '../../hooks/api';
import ProductForm from '../../components/product/ProductForm';

const EditProduct = () => {
	const navigate = useNavigate();

	const { productId } = useParams<{ productId: string }>();
	const { data: product, isLoading, error } = useGetProduct(productId || '');


	if (isLoading) return <div>Loading...</div>;

	if (error) {
		const output = error.response!.data as { status: boolean; error: string };
		if (output.status === false) {
			return <div>{output.error}</div>;
		} else return <div>{error.message}</div>;
	}

	return (
		<main className="page">
			<h1>Edit Product</h1>
			<ProductForm
				mode="EDIT"
				data={product}
			/>
		</main>
	);
};
export default EditProduct;
