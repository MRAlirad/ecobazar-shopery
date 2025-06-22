import useGetList from '../useGetList';
import apiConfig from '../apiConfig';
import ProductSchema from '../../../schemas/ProductSchema';

const useGetProductsList = ({ params }: { params?: string }) => {
	const { path, queryKey } = apiConfig.product;
	return useGetList<ProductSchema>({ path, queryKey, params });
};

export default useGetProductsList;
