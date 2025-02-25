import { useState } from 'react';
import { useSearchParams } from 'react-router';
import { useGetCategoriesList, useDeleteCategory } from '../../hooks/api';
import { TableListSkeleton } from '../../components/Skeletons';
import Button from '../../components/Button';
import { DeleteModal } from '../../components/Modal';
import Pagination from '../../components/Pagination';
import CategorySchema from '../../schemas/categorySchema';
import { FaTrash, FaPen } from 'react-icons/fa';

const CategoriesList = () => {
	const [searchParams] = useSearchParams();
	const { data: categories, isLoading } = useGetCategoriesList({ params: searchParams.toString() });

	if (isLoading) return <TableListSkeleton />;

	return (
		<div className="page">
			<div className="flex items-center justify-between">
				<h1>Categories List</h1>
				<Button
					to="/category/add"
					text="Add Category"
				/>
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
						{categories?.data?.map((category, index) => (
							<RowItem
								key={category._id}
								row={index + 1}
								{...category}
							/>
						))}
					</tbody>
				</table>
			</div>

			{categories && categories?.totalPages > 1 && (
				<Pagination
					currentPage={categories?.currentPage}
					totalPages={categories?.totalPages}
				/>
			)}
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
