import useGetList from '../useGetList';
import apiConfig from '../apiConfig';
import ProductSchema from '../../../schemas/ProductSchema';

const useGetProductsList = () => {
	const { path, queryKey } = apiConfig.product;
	return useGetList<ProductSchema>({ path, queryKey });
};

export default useGetProductsList;
