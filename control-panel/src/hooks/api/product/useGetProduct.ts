import { useQuery } from '@tanstack/react-query';
import apiClient from '../apiClient';
import apiConfig from '../apiConfig';
import ProductSchema from '../../../schemas/ProductSchema';
import { AxiosError } from 'axios';

const useGetProduct = (id: string) => {
	const { path, queryKey } = apiConfig.product;
	return useQuery<ProductSchema, AxiosError>({
		queryKey: [queryKey, id],
		queryFn: () => apiClient.get<ProductSchema>(`${path}/${id}`).then(res => res.data),
	});
};

export default useGetProduct;
