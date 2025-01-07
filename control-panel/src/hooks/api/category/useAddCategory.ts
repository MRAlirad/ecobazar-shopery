import useAdd from '../useAdd';
import apiConfig from '../apiConfig';
import { AddProps } from '../../../schemas/apiHookSchema';
import CategorySchema from '../../../schemas/categorySchema';

const useAddCategory = ({ successToast, onAdd = () => {} }: AddProps<CategorySchema>) => {
	const { path, queryKey } = apiConfig.category;
	return useAdd<CategorySchema>({ path, queryKey, successToast, onAdd });
};

export default useAddCategory;
