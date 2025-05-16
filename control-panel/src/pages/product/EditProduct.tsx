import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useGetProduct, useEditProduct, useDeleteProduct } from '../../hooks/api';
import { FormSkeleton } from '../../components/Skeletons';
import Page from '../../components/Page';
import PageHeader from '../../components/PageHeader';
import ProductForm from '../../components/product/ProductForm';
import DeleteModal from '../../components/DeleteModal';
import Breadcrumb from '../../components/Breadcrumb';
import { FaShoppingCart } from 'react-icons/fa';

const EditProduct = () => {
	const navigate = useNavigate();
	const [deleteModalDisplay, setDeleteModalDisplay] = useState(false);

	const { productId } = useParams<{ productId: string }>();
	const { data: product, isLoading, error } = useGetProduct(productId!);

	const editProduct = useEditProduct({
		id: productId!,
		successToast: 'Product updated successfully',
		onEdit: () => navigate('/product'),
	});
	const deleteProduct = useDeleteProduct({
		successToast: 'Product deleted successfully',
		onDelete: () => navigate('/product'),
	});

	if (isLoading) return <FormSkeleton />;

	if (error) return <div>{error.response!.data as string[]}</div>;

	return (
		<Page type="form">
			<Breadcrumb
				type="home"
				breadcrumb={[{ label: 'Products List', icon: <FaShoppingCart />, link: '/product' }, { label: 'Edit Product' }]}
			/>
			<PageHeader
				title="Edit Product"
				backLink="/product"
			/>
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
		</Page>
	);
};
export default EditProduct;
