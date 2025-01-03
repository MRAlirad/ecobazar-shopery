import { useGetProductsList } from '../../hooks/api';
import { Link } from 'react-router';

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
								<td>{product.status}</td>
								<td className="action">{}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default ProductsList;
