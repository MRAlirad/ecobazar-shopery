import useGetDetails from '../useGetDetails';
import apiConfig from '../apiConfig';
import CategorySchema from '../../../schemas/categorySchema';

const useGetCategory = (id: string) => {
	const { path, queryKey } = apiConfig.category;
	return useGetDetails<CategorySchema>({ path, queryKey, id });
};

export default useGetCategory;
