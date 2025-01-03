import { useQuery } from '@tanstack/react-query';
import apiClient from '../apiClient';
import apiConfig from '../apiConfig';
import ProductSchema from '../../../schemas/ProductSchema';

const useGetProductsList = () => {
	const { path, queryKey } = apiConfig.product;
	return useQuery({
		queryKey: [queryKey],
		queryFn: () => apiClient.get<ProductSchema[]>(path).then(res => res.data),
	});
};

export default useGetProductsList;
