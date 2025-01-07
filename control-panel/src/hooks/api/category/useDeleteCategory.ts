import useDelete from '../useDelete';
import apiConfig from '../apiConfig';
import { DeleteProps } from '../../../schemas/apiHookSchema';
import CategorySchema from '../../../schemas/categorySchema';

const useDeleteCategory = ({ successToast, onDelete = () => {} }: DeleteProps<CategorySchema>) => {
	const { path, queryKey } = apiConfig.category;
	return useDelete<CategorySchema>({ path, queryKey, successToast, onDelete });
};

export default useDeleteCategory;
