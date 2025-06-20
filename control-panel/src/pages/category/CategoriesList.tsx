import { useState } from 'react';
import { useSearchParams } from 'react-router';
import { useFirstMountState } from 'react-use';
import { useGetCategoriesList, useDeleteCategory } from '../../hooks/api';
import { ListSkeleton } from '../../components/Skeletons';
import Page from '../../components/Page';
import Breadcrumb from '../../components/Breadcrumb';
import PageHeader from '../../components/PageHeader';
import Table from '../../components/Table';
import DeleteModal from '../../components/DeleteModal';
import { FaTrash, FaPen } from 'react-icons/fa';
import { BiSolidCategoryAlt } from 'react-icons/bi';

const CategoriesList = () => {
	const [searchParams] = useSearchParams();
	const [deleteModalDisplay, setDeleteModalDisplay] = useState<null | string>(null);
	const isFirstMount = useFirstMountState();

	const { data: categories, isLoading: isCategoriesLoding } = useGetCategoriesList({ params: searchParams.toString() });

	const deleteCategory = useDeleteCategory({
		successToast: 'Category deleted successfully',
	});

	if (isFirstMount && isCategoriesLoding) return <ListSkeleton />;

	return (
		<Page type="list">
			<Breadcrumb type="home" breadcrumb={[{ label: 'Categories List', icon: <BiSolidCategoryAlt /> }]} />
			<PageHeader title="Categories List" action={{ text: 'Add Category', to: '/category/add' }} />

			<Table
				columns={[
					{ name: 'title', label: 'Category name' },
					{ name: 'action', label: '' },
				]}
				rows={(() => {
					const rows = [];

					if (categories)
						for (const { _id, title } of categories.data) {
							rows.push([
								{
									name: 'title',
									value: title,
								},
								{
									name: 'action',
									actions: [
										{
											text: 'edit',
											icon: <FaPen size={16} />,
											className: 'hover:!bg-neutral-100 !text-neutral-500',
											to: `/category/${_id}`,
										},
										{
											text: 'delete',
											icon: <FaTrash size={16} />,
											className: 'hover:!bg-red-100 !text-red-500',
											loading: deleteCategory.isPending,
											onClick: () => setDeleteModalDisplay(_id),
										},
									],
									component: deleteModalDisplay === _id && (
										<DeleteModal
											title={`Are you sure you want to delete the "${title}" category?`}
											onDelete={() => deleteCategory.mutate(_id)}
											onClose={() => setDeleteModalDisplay(null)}
											isDeleting={deleteCategory.isPending}
										/>
									),
								},
								{
									name: 'link',
									link: `/category/${_id}`,
								},
							]);
						}

					return rows;
				})()}
				isLoading={isCategoriesLoding}
				pagination={{
					currentPage: +(searchParams.get('page') ?? '1'),
					totalPages: categories?.totalPages || 1,
				}}
			/>
		</Page>
	);
};

export default CategoriesList;
