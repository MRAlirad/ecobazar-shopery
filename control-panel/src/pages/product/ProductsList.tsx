import { useGetProductsList } from '../../hooks/api';
import { Link } from 'react-router';
import Button from '../../components/Button';
import { statuses } from '../../values';
import { FaTrash, FaPen } from 'react-icons/fa';

const ProductsList = () => {
	const { data: products } = useGetProductsList();
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
							<th>Row</th>
							<th>Product name</th>
							<th>Price</th>
							<th>Discount</th>
							<th>Status</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{products?.map((product, index) => (
							<tr key={product.id}>
								<td>{index + 1}</td>
								<td className="font-bold">{product.title}</td>
								<td>{product.price}</td>
								<td>{product.discount}</td>
								<td>{statuses.find(s => s.value === product.status)?.label}</td>
								<td className="action">
									<div className="flex items-center gap-2">
										<Button
											color="green"
											size="icon"
											icon={<FaPen size="15" />}
										/>
										<Button
											color="red"
											size="icon"
											icon={<FaTrash size="15" />}
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
