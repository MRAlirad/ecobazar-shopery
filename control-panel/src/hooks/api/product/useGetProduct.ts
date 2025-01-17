import useGetDetails from '../useGetDetails';
import apiConfig from '../apiConfig';
import ProductSchema from '../../../schemas/ProductSchema';

const useGetProduct = (id: string) => {
	const { path, queryKey } = apiConfig.product;
	return useGetDetails<ProductSchema>({ path, queryKey, id });
};

export default useGetProduct;
