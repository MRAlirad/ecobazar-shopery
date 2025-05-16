import { useNavigate } from 'react-router';
import { useAddCategory } from '../../hooks/api';
import Page from '../../components/Page';
import Breadcrumb from '../../components/Breadcrumb';
import PageHeader from '../../components/PageHeader';
import CategoryForm from '../../components/category/CategoryForm';
import { BiSolidCategoryAlt } from 'react-icons/bi';

const AddCategory = () => {
	const navigate = useNavigate();
	const addCategory = useAddCategory({
		successToast: 'Category added successfully',
		onAdd: () => navigate('/category'),
	});

	return (
		<Page type="form">
			<Breadcrumb
				type="home"
				breadcrumb={[{ label: 'Categories List', icon: <BiSolidCategoryAlt />, link: '/category' }, { label: 'Add Category' }]}
			/>
			<PageHeader
				title="Add Category"
				backLink="/category"
			/>
			<CategoryForm
				mode="ADD"
				onAdd={data => addCategory.mutate(data)}
				isAdding={addCategory.isPending}
			/>
		</Page>
	);
};

export default AddCategory;
