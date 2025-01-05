import useAdd from '../useAdd';
import apiConfig from '../apiConfig';
import { AddProps } from '../../../schemas/apiHookSchema';
import ProductSchema from '../../../schemas/ProductSchema';

const useAddProduct = ({ successToast, onAdd = () => {} }: AddProps<ProductSchema>) => {
	const { path, queryKey } = apiConfig.product;
	return useAdd<ProductSchema>({ path, queryKey, successToast, onAdd });
};

export default useAddProduct;
