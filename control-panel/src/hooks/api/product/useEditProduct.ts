import useEdit from '../useEdit';
import apiConfig from '../apiConfig';
import { EditProps } from '../../../schemas/apiHookSchema';
import ProductSchema from '../../../schemas/ProductSchema';

const useEditProduct = ({ successToast, id, onEdit = () => {} }: EditProps<ProductSchema>) => {
	const { path, queryKey } = apiConfig.product;
	return useEdit<ProductSchema>({
		id,
		path,
		queryKey,
		successToast,
		onEdit,
	});
};

export default useEditProduct;
