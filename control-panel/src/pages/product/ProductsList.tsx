import { useGetProductsList, useDeleteProduct } from '../../hooks/api';
import { Link } from 'react-router';
import { TableListSkeleton } from '../../components/Skeletons';
import Button from '../../components/Button';
import Badge from '../../components/Badge';
import { statuses } from '../../values';
import { FaTrash, FaPen } from 'react-icons/fa';
import { DeleteModal } from '../../components/Modal';

const ProductsList = () => {
	const { data: products, isLoading } = useGetProductsList();

	const deleteProduct = useDeleteProduct({
		successToast: 'Product deleted successfully',
	});

	if (isLoading) return <TableListSkeleton />;

	return (
		<div className="page">
			<DeleteModal title="Are you sure you want to delete this product?" />
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
							<tr key={product._id}>
								<td>{index + 1}</td>
								<td>
									<div className="flex items-center gap-2">
										<div className="img-box size-14 aspect-square rounded">
											<img
												src={product.images[0]}
												alt={product.title}
												className="object-cover"
											/>
										</div>
										<span className="font-bold">{product.title}</span>
									</div>
								</td>
								<td>{product.price}</td>
								<td>%{product.discount}</td>
								<td>
									<Badge
										color={product.status === 1 ? 'green' : product.status === 2 ? 'red' : 'gray'}
										text={statuses.find(s => s.value === product.status)?.label ?? ''}
									/>
								</td>
								<td>
									<div className="flex items-center gap-2">
										<Button
											color="green"
											size="icon"
											icon={<FaPen size="15" />}
											to={`/product/edit/${product._id}`}
										/>
										<Button
											color="red"
											size="icon"
											icon={<FaTrash size="15" />}
											loading={deleteProduct.isPending}
											onClick={() => product?._id && deleteProduct.mutate(product._id)}
										/>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default ProductsList;
