import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import apiClient from '../apiClient';
import apiConfig from '../apiConfig';
import ProductSchema from '../../../schemas/ProductSchema';
import ErrorValidation from '../../../components/ErrorValidation';

interface Props {
	onAdd?: (data: ProductSchema) => void;
	onError?: () => void;
	successToast?: string;
}

const useAddProduct = ({ onAdd = () => {}, onError = () => {} }: Props) => {
	const { path, queryKey } = apiConfig.product;
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: ProductSchema) => apiClient.post(path, data).then(res => res.data),
		onSuccess: (data: ProductSchema) => {
			toast.success('Product added successfully');
			queryClient.invalidateQueries({ queryKey: [queryKey] });
			onAdd(data);
		},
		onError: ({ response }: AxiosError) => {
			const output = response!.data as { status: boolean; errors: string[] };
			toast.error(ErrorValidation(output.errors));
			onError();
		},
	});
};

export default useAddProduct;
