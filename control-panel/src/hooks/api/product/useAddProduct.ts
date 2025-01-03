import { useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '../apiClient';
import apiConfig from '../apiConfig';
import ProductSchema from '../../../schemas/ProductSchema';
import { toast } from 'react-toastify';

interface Props {
	onAdd?: () => void;
	onError?: () => void;
	successToast?: string;
}

const useAddProduct = ({ onAdd = () => {}, onError = () => {} }: Props) => {
	const { path, queryKey } = apiConfig.product;
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: ProductSchema) => apiClient.post(path, data).then(res => res.data),
		onSuccess: (data: ProductSchema) => {
			console.log(data);
			queryClient.invalidateQueries({ queryKey: [queryKey] });
			onAdd();
		},
		onError: (error: Error) => {
			toast.error(error.message);
			onError();
		},
	});
};

export default useAddProduct;
