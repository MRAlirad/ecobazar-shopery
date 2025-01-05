import useDelete from '../useDelete';
import apiConfig from '../apiConfig';
import { DeleteProps } from '../../../schemas/apiHookSchema';
import ProductSchema from '../../../schemas/ProductSchema';

const useDeleteProduct = ({ successToast, onDelete = () => {} }: DeleteProps<ProductSchema>) => {
	const { path, queryKey } = apiConfig.product;
	return useDelete<ProductSchema>({ path, queryKey, successToast, onDelete });
};

export default useDeleteProduct;
