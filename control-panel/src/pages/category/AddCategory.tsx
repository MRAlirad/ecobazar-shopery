import { useNavigate } from 'react-router';
import { useAddCategory } from '../../hooks/api';
import PageHeader from '../../components/PageHeader';
import CategoryForm from '../../components/category/CategoryForm';

const AddCategory = () => {
	const navigate = useNavigate();
	const addCategory = useAddCategory({
		successToast: 'Category added successfully',
		onAdd: () => navigate('/category/list'),
	});

	return (
		<main className="page">
			<PageHeader
				title="Add Category"
				backLink="/category/list"
			/>
			<CategoryForm
				mode="ADD"
				onAdd={data => addCategory.mutate(data)}
				isAdding={addCategory.isPending}
			/>
		</main>
	);
};

export default AddCategory;
