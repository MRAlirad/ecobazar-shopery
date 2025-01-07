import { useState } from 'react';
import { useGetProductsList, useDeleteProduct } from '../../hooks/api';
import { Link } from 'react-router';
import { TableListSkeleton } from '../../components/Skeletons';
import Button from '../../components/Button';
import Badge from '../../components/Badge';
import { statuses } from '../../values';
import { FaTrash, FaPen } from 'react-icons/fa';
import { DeleteModal } from '../../components/Modal';
import ProductSchema from '../../schemas/ProductSchema';

const ProductsList = () => {
	const { data: products, isLoading } = useGetProductsList();

	if (isLoading) return <TableListSkeleton />;

	return (
		<div className="page">
			<div className="flex items-center justify-between">
				<h1>Products List</h1>
				<Link
					to="/product/add"
					className="btn blue medium"
				>
					Add Product
				</Link>
			</div>

			<div className="table-wrapper">
				<table>
					<thead>
						<tr>
							<th className="row">Row</th>
							<th>Product name</th>
							<th>Price</th>
							<th>Discount</th>
							<th>Status</th>
							<th className="action">Actions</th>
						</tr>
					</thead>
					<tbody>
						{products?.map((product, index) => (
							<RowItem
								key={product._id}
								row={index + 1}
								{...product}
							/>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

const RowItem = ({ row, _id, title, status, price, discount, images }: ProductSchema & { row: number }) => {
	const [deleteModalDisplay, setDeleteModalDisplay] = useState(false);
	const deleteProduct = useDeleteProduct({
		successToast: 'Product deleted successfully',
	});

	return (
		<>
			<tr key={_id}>
				<td>{row}</td>
				<td>
					<div className="flex items-center gap-2">
						<div className="img-box size-14 aspect-square rounded">
							<img
								src={images[0]}
								alt={title}
								className="object-cover"
							/>
						</div>
						<span className="font-bold">{title}</span>
					</div>
				</td>
				<td>{price}</td>
				<td>%{discount}</td>
				<td>
					<Badge
						color={status === 1 ? 'green' : status === 2 ? 'red' : 'gray'}
						text={statuses.find(s => s.value === status)?.label ?? ''}
					/>
				</td>
				<td>
					<div className="flex items-center gap-2">
						<Button
							color="green"
							size="icon"
							icon={<FaPen size="15" />}
							to={`/product/edit/${_id}`}
						/>
						<Button
							color="red"
							size="icon"
							icon={<FaTrash size="15" />}
							loading={deleteProduct.isPending}
							onClick={() => setDeleteModalDisplay(true)}
						/>
					</div>
				</td>
			</tr>
			{deleteModalDisplay && (
				<DeleteModal
					title={`Are you sure you want to delete the "${title}" product?`}
					onClose={() => setDeleteModalDisplay(false)}
					onDelete={() => _id && deleteProduct.mutate(_id)}
					isDeleting={deleteProduct.isPending}
				/>
			)}
		</>
	);
};

export default ProductsList;
