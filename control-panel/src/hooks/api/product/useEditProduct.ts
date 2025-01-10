import useEdit from '../useEdit';
import apiConfig from '../apiConfig';
import { EditProps } from '../../../schemas/apiHookSchema';
import ProductSchema, {ProductFormInputs} from '../../../schemas/ProductSchema';

const useEditProduct = ({ id, successToast, onEdit = () => {} }: EditProps<ProductSchema>) => {
	const { path, queryKey } = apiConfig.product;
	return useEdit<ProductFormInputs, ProductSchema>({ id, path, queryKey, successToast, onEdit });
};

export default useEditProduct;
