import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useGetProduct, useEditProduct, useDeleteProduct } from '../../hooks/api';
import { FormSkeleton } from '../../components/Skeletons';
import ProductForm from '../../components/product/ProductForm';
import { DeleteModal } from '../../components/Modal';

const EditProduct = () => {
	const navigate = useNavigate();
	const [deleteModalDisplay, setDeleteModalDisplay] = useState(false);

	const { productId } = useParams<{ productId: string }>();
	const { data: product, isLoading, error } = useGetProduct(productId!);

	const editProduct = useEditProduct({
		id: productId!,
		successToast: 'Product updated successfully',
		onEdit: () => navigate('/product/list'),
	});
	const deleteProduct = useDeleteProduct({
		successToast: 'Product deleted successfully',
		onDelete: () => navigate('/product/list'),
	});

	if (isLoading) return <FormSkeleton />;

	if (error) return <div>{error.response!.data as string[]}</div>;

	return (
		<main className="page">
			<h1>Edit Product</h1>
			<ProductForm
				mode="EDIT"
				data={product}
				onEdit={data => editProduct.mutate(data)}
				isEditing={editProduct.isPending}
				onDelete={() => setDeleteModalDisplay(true)}
				isDeleting={deleteProduct.isPending}
			/>
			{deleteModalDisplay && (
				<DeleteModal
					title={`Are you sure you want to delete the "${product?.title}" product?`}
					onClose={() => setDeleteModalDisplay(false)}
					onDelete={() => deleteProduct.mutate(productId!)}
					isDeleting={deleteProduct.isPending}
				/>
			)}
		</main>
	);
};
export default EditProduct;
