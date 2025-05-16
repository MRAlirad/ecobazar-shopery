import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useGetCategory, useEditCategory, useDeleteCategory } from '../../hooks/api';
import { FormSkeleton } from '../../components/Skeletons';
import Page from '../../components/Page';
import Breadcrumb from '../../components/Breadcrumb';
import PageHeader from '../../components/PageHeader';
import CategoryForm from '../../components/category/CategoryForm';
import DeleteModal from '../../components/DeleteModal';
import { BiSolidCategoryAlt } from 'react-icons/bi';

const EditCategory = () => {
	const navigate = useNavigate();
	const [deleteModalDisplay, setDeleteModalDisplay] = useState(false);

	const { categoryId } = useParams<{ categoryId: string }>();
	const { data: category, isLoading, error } = useGetCategory(categoryId!);

	const editCategory = useEditCategory({
		id: categoryId!,
		successToast: 'Category updated successfully',
		onEdit: () => navigate('/category'),
	});
	const deleteCategory = useDeleteCategory({
		successToast: 'Category deleted successfully',
		onDelete: () => navigate('/category'),
	});

	if (isLoading) return <FormSkeleton />;

	if (error) return <div>{error.response!.data as string[]}</div>;

	return (
		<Page type="form">
			<Breadcrumb
				type="home"
				breadcrumb={[{ label: 'Categories List', icon: <BiSolidCategoryAlt />, link: '/category' }, { label: 'Edit Category' }]}
			/>
			<PageHeader
				title="Edit Category"
				backLink="/category"
			/>
			<CategoryForm
				mode="EDIT"
				data={category}
				onEdit={data => editCategory.mutate(data)}
				isEditing={editCategory.isPending}
				onDelete={() => setDeleteModalDisplay(true)}
				isDeleting={deleteCategory.isPending}
			/>
			{deleteModalDisplay && (
				<DeleteModal
					title={`Are you sure you want to delete the "${category?.title}" category?`}
					onClose={() => setDeleteModalDisplay(false)}
					onDelete={() => deleteCategory.mutate(categoryId!)}
					isDeleting={deleteCategory.isPending}
				/>
			)}
		</Page>
	);
};
export default EditCategory;
