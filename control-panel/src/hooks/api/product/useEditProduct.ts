import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import apiClient from '../apiClient';
import apiConfig from '../apiConfig';
import ProductSchema from '../../../schemas/ProductSchema';
import ErrorValidation from '../../../components/ErrorValidation';

interface Props {
	id: string;
	onEdit?: (data: ProductSchema) => void;
	onError?: () => void;
	successToast?: string;
}

const useEditProduct = ({ id, onEdit = () => {}, onError = () => {} }: Props) => {
	const { path, queryKey } = apiConfig.product;
	const queryClient = useQueryClient();

	return useMutation<ProductSchema, AxiosError, ProductSchema>({
		mutationFn: (data: ProductSchema) => apiClient.patch(`${path}/${id}`, data).then(res => res.data),
		onSuccess: (data: ProductSchema) => {
			toast.success('Product edited successfully');
			queryClient.invalidateQueries({ queryKey: [queryKey] });
			onEdit(data);
		},
		onError: ({ response }: AxiosError) => {
			const output = response!.data as { status: boolean; errors: string[] };
			toast.error(ErrorValidation(output.errors));
			onError();
		},
	});
};

export default useEditProduct;
