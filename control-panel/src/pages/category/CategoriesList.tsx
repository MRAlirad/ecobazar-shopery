import { useState } from 'react';
import { useGetCategoriesList, useDeleteCategory } from '../../hooks/api';
import { Link } from 'react-router';
import { TableListSkeleton } from '../../components/Skeletons';
import Button from '../../components/Button';
import { FaTrash, FaPen } from 'react-icons/fa';
import { DeleteModal } from '../../components/Modal';
import CategorySchema from '../../schemas/categorySchema';

const CategoriesList = () => {
	const { data: categories, isLoading } = useGetCategoriesList();

	if (isLoading) return <TableListSkeleton />;

	return (
		<div className="page">
			<div className="flex items-center justify-between">
				<h1>Categories List</h1>
				<Link
					to="/category/add"
					className="btn blue medium"
				>
					Add Category
				</Link>
			</div>

			<div className="table-wrapper">
				<table>
					<thead>
						<tr>
							<th className="row">Row</th>
							<th>Product name</th>
							<th className="action">Actions</th>
						</tr>
					</thead>
					<tbody>
						{categories?.map((category, index) => (
							<RowItem
								key={category._id}
								row={index + 1}
								{...category}
							/>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

const RowItem = ({ row, _id, title }: CategorySchema & { row: number }) => {
	const [deleteModalDisplay, setDeleteModalDisplay] = useState(false);
	const deleteCategory = useDeleteCategory({
		successToast: 'Category deleted successfully',
	});

	return (
		<>
			<tr key={_id}>
				<td>{row}</td>
				<td className="font-bold">{title}</td>
				<td>
					<div className="flex items-center gap-2">
						<Button
							color="green"
							size="icon"
							icon={<FaPen size="15" />}
							to={`/category/edit/${_id}`}
						/>
						<Button
							color="red"
							size="icon"
							icon={<FaTrash size="15" />}
							// loading={deleteCategory.isPending}
							onClick={() => setDeleteModalDisplay(true)}
						/>
					</div>
				</td>
			</tr>
			{deleteModalDisplay && (
				<DeleteModal
					title={`Are you sure you want to delete the "${title}" category?`}
					onClose={() => setDeleteModalDisplay(false)}
					onDelete={() => _id && deleteCategory.mutate(_id)}
					isDeleting={deleteCategory.isPending}
				/>
			)}
		</>
	);
};

export default CategoriesList;
