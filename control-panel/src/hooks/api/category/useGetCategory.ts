import useGet from '../useGet';
import apiConfig from '../apiConfig';
import CategorySchema from '../../../schemas/categorySchema';

const useGetCategory = (id: string) => {
	const { path, queryKey } = apiConfig.category;
	return useGet<CategorySchema>({ path, queryKey, id });
};

export default useGetCategory;
