import useGetList from '../useGetList';
import apiConfig from '../apiConfig';
import CategorySchema from '../../../schemas/categorySchema';

const useGetCategoriesList = ({ params }: { params: string | object }) => {
	const { path, queryKey } = apiConfig.category;
	return useGetList<CategorySchema>({ path, queryKey, params });
};

export default useGetCategoriesList;
