import useGetDropdownList from '../useGetDropdownList';
import apiConfig from '../apiConfig';
import CategorySchema from '../../../schemas/categorySchema';

const useGetCategoriesDropdownList = () => {
	const { path, queryKey } = apiConfig.category;
	return useGetDropdownList<CategorySchema>({ path, queryKey });
};

export default useGetCategoriesDropdownList;
