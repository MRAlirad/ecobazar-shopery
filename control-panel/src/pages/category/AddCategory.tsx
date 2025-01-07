import { useNavigate } from 'react-router';
import { useAddCategory } from '../../hooks/api';
import CategoryForm from '../../components/category/CategoryForm';

const AddCategory = () => {
	const navigate = useNavigate();
	const addCategory = useAddCategory({
		successToast: 'Category added successfully',
		onAdd: () => navigate('/category/list'),
	});

	return (
		<main className="page">
			<h1>Add Category</h1>
			<CategoryForm
				mode="ADD"
				onAdd={data => addCategory.mutate(data)}
				isAdding={addCategory.isPending}
			/>
		</main>
	);
};

export default AddCategory;
