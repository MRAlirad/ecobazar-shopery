import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import apiClient from './apiClient';
import ErrorValidation from './../../components/ErrorValidation';
import { DeleteProps } from '../../schemas/apiHookSchema';

const useDelete = <T>({ path, queryKey, successToast, onDelete = () => {}, onError = () => {} }: DeleteProps<T>) => {
	const queryClient = useQueryClient();
	return useMutation<T, AxiosError, string>({
		mutationFn: (id: string) => apiClient.delete(`${path}/${id}`).then(res => res.data),
		onSuccess: (data: T) => {
			toast.success(successToast);
			queryClient.invalidateQueries({ queryKey: [queryKey] });
			onDelete(data);
		},
		onError: ({ response }: AxiosError) => {
			const output = response!.data as { status: boolean; errors: string[] };
			toast.error(ErrorValidation(output.errors));
			onError();
		},
	});
};

export default useDelete;
