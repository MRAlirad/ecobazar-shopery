import useGet from '../useGet';
import apiConfig from '../apiConfig';
import ProductSchema from '../../../schemas/ProductSchema';

const useGetProduct = (id: string) => {
	const { path, queryKey } = apiConfig.product;
	return useGet<ProductSchema>({ path, queryKey, id });
};

export default useGetProduct;
