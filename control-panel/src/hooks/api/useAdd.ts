import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import apiClient from './apiClient';
import ErrorValidation from './../../components/ErrorValidation';
import { AddProps } from '../../schemas/apiHookSchema';

const useAdd = <T>({ path, queryKey, successToast, onAdd = () => {}, onError = () => {} }: AddProps<T>) => {
	const queryClient = useQueryClient();
	return useMutation<T, AxiosError, T>({
		mutationFn: (data: T) => apiClient.post(`${path}`, data).then(res => res.data),
		onSuccess: (data: T) => {
			toast.success(successToast);
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

export default useAdd;
