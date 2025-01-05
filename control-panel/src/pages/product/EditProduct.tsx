import { useNavigate } from 'react-router';
import { useParams } from 'react-router';
import { useGetProduct, useEditProduct, useDeleteProduct } from '../../hooks/api';
import { FormSkeleton } from '../../components/Skeletons';
import ProductForm from '../../components/product/ProductForm';

const EditProduct = () => {
	const navigate = useNavigate();

	const { productId } = useParams<{ productId: string }>();
	const { data: product, isLoading, error } = useGetProduct(productId || '');

	const editProduct = useEditProduct({
		id: productId,
		successToast: 'Product updated successfully',
		onEdit: () => navigate('/product/list'),
	});
	const deleteProduct = useDeleteProduct({
		successToast: 'Product deleted successfully',
		onDelete: () => navigate('/product/list'),
	});

	if (isLoading) return <FormSkeleton />;

	if (error) {
		const output = error.response!.data as { status: boolean; errors: string[] };
		if (output.status === false) {
			return <div>{output.errors}</div>;
		} else return <div>{error.message}</div>;
	}

	return (
		<main className="page">
			<h1>Edit Product</h1>
			<ProductForm
				mode="EDIT"
				data={product}
				onEdit={data => editProduct.mutate(data)}
				isEditing={editProduct.isPending}
				onDelete={() => deleteProduct.mutate(productId || '')}
				isDeleting={deleteProduct.isPending}
			/>
		</main>
	);
};
export default EditProduct;
