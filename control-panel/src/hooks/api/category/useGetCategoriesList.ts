import useGetList from '../useGetList';
import apiConfig from '../apiConfig';
import CategorySchema from '../../../schemas/categorySchema';

const useGetCategoriesList = () => {
	const { path, queryKey } = apiConfig.category;
	return useGetList<CategorySchema>({ path, queryKey });
};

export default useGetCategoriesList;
