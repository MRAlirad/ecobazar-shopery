import { useState } from 'react';
import { useSearchParams } from 'react-router';
import { useFirstMountState } from 'react-use';
import { useGetProductsList, useDeleteProduct } from '../../hooks/api';
import { ListSkeleton } from '../../components/Skeletons';
import Page from '../../components/Page';
import Breadcrumb from '../../components/Breadcrumb';
import PageHeader from '../../components/PageHeader';
import Table from '../../components/Table';
import Badge from '../../components/Badge';
import DeleteModal from '../../components/DeleteModal';
import { statuses } from '../../values';
import { FaTrash, FaPen, FaShoppingCart } from 'react-icons/fa';
import { numberToCurrency } from '../../helpers/Number';

const ProductsList = () => {
	const [searchParams] = useSearchParams();
	const [deleteModalDisplay, setDeleteModalDisplay] = useState<null | string>(null);
	const isFirstMount = useFirstMountState();

	const { data: products, isLoading: isProductLoading } = useGetProductsList({ params: searchParams.toString() });

	const deleteProduct = useDeleteProduct({
		successToast: 'Product deleted successfully',
	});

	if (isFirstMount && isProductLoading) return <ListSkeleton />;

	return (
		<Page type="list">
			<Breadcrumb type="home" breadcrumb={[{ label: 'Products List', icon: <FaShoppingCart /> }]} />
			<PageHeader title="Products List" action={{ text: 'Add Product', to: '/product/add' }} />

			<Table
				columns={[
					{ name: 'title', label: 'Product name' },
					{ name: 'price', label: 'Price' },
					{ name: 'discount', label: 'Discount' },
					{ name: 'status', label: 'Status' },
					{ name: 'action', label: '' },
				]}
				rows={(() => {
					const rows = [];

					if (products)
						for (const { _id, title, images, price, discount, status } of products.data) {
							rows.push([
								{
									name: 'title',
									component: (
										<div className="flex items-center gap-2">
											<div className="img-box size-14 aspect-square rounded">
												<img src={images[0]} alt={title} className="object-cover" />
											</div>
											<span className="font-bold">{title}</span>
										</div>
									),
								},
								{ name: 'price', value: `$${numberToCurrency(price)}` },
								{ name: 'discount', value: `%${discount}` },
								{
									name: 'status',
									component: <Badge color={statuses.find(s => s.value === status)?.badge ?? 'red'} text={statuses.find(s => s.value === status)?.label ?? 'not defined'} />,
								},
								{
									name: 'action',
									actions: [
										{
											text: 'edit',
											icon: <FaPen size={16} />,
											className: 'hover:!bg-neutral-100 !text-neutral-500',
											to: `/product/${_id}`,
										},
										{
											text: 'delete',
											icon: <FaTrash size={16} />,
											className: 'hover:!bg-red-100 !text-red-500',
											loading: deleteProduct.isPending,
											onClick: () => setDeleteModalDisplay(_id),
										},
									],
									component: deleteModalDisplay === _id && (
										<DeleteModal
											title={`Are you sure you want to delete the "${title}" product?`}
											onDelete={() => deleteProduct.mutate(_id)}
											onClose={() => setDeleteModalDisplay(null)}
											isDeleting={deleteProduct.isPending}
										/>
									),
								},
								{
									name: 'link',
									link: `/product/${_id}`,
								},
							]);
						}

					return rows;
				})()}
				isLoading={isProductLoading}
				pagination={{
					currentPage: +(searchParams.get('page') ?? '1'),
					totalPages: products?.totalPages || 1,
				}}
			/>
		</Page>
	);
};

export default ProductsList;
