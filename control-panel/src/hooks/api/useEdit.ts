import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import apiClient from './apiClient';
import ErrorValidation from './../../components/ErrorValidation';
import { EditProps } from '../../schemas/apiHookSchema';

const useEdit = <T>({ id, path, queryKey, successToast, onEdit = () => {}, onError = () => {} }: EditProps<T>) => {
	const queryClient = useQueryClient();
	return useMutation<T, AxiosError, T>({
		mutationFn: (data: T) => apiClient.patch(`${path}/${id}`, data).then(res => res.data),
		onSuccess: (data: T) => {
			toast.success(successToast);
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

export default useEdit;
