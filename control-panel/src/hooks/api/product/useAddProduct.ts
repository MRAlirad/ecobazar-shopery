import useAdd from '../useAdd';
import apiConfig from '../apiConfig';
import { AddProps } from '../../../schemas/apiHookSchema';
import ProductSchema, { ProductFormInputs } from '../../../schemas/ProductSchema';

const useAddProduct = ({ successToast, onAdd = () => {} }: AddProps<ProductSchema>) => {
	const { path, queryKey } = apiConfig.product;
	return useAdd<ProductFormInputs, ProductSchema>({ path, queryKey, successToast, onAdd });
};

export default useAddProduct;
