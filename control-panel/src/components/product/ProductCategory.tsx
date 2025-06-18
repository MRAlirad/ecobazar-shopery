import Card from '../Card';
import Select from '../Select';
import { useGetCategoriesList } from '../../hooks/api';

const ProductCategory = () => {
	const { data: categories, isLoading } = useGetCategoriesList({ params: { display: 'all' } });

	return (
		<Card>
			<Select
				name="category"
				label="Cateogry"
				isLoading={isLoading}
				isClearable
				options={categories ? categories.data.map(category => ({ label: category.title, value: category._id || '' })) : []}
			/>
		</Card>
	);
};

export default ProductCategory;
