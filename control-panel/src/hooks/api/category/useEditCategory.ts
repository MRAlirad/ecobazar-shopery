import useEdit from '../useEdit';
import apiConfig from '../apiConfig';
import { EditProps } from '../../../schemas/apiHookSchema';
import CategorySchema from '../../../schemas/categorySchema';

const useEditCategory = ({ id, successToast, onEdit = () => {} }: EditProps<CategorySchema>) => {
	const { path, queryKey } = apiConfig.category;
	return useEdit<CategorySchema>({ id, path, queryKey, successToast, onEdit });
};

export default useEditCategory;
