import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import apiClient from '../apiClient';
import apiConfig from '../apiConfig';
import ProductSchema from '../../../schemas/ProductSchema';

interface Props {
	onDelete?: (data: ProductSchema) => void;
	onError?: () => void;
	successToast?: string;
}

const useDeleteProduct = ({ onDelete = () => {}, onError = () => {} }: Props) => {
	const { path, queryKey } = apiConfig.product;
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: string) => apiClient.delete(`${path}/${id}`).then(res => res.data),
		onSuccess: (data: ProductSchema) => {
			toast.success('Product deleted successfully');
			queryClient.invalidateQueries({ queryKey: [queryKey] });
			onDelete(data);
		},
		onError: ({ response }: AxiosError) => {
			const output = response!.data as { status: boolean; error: string };
			toast.error(output.error);
			onError();
		},
	});
};

export default useDeleteProduct;
