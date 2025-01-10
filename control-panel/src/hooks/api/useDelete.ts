import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import apiClient from './apiClient';
import ErrorValidation from './../../components/ErrorValidation';
import { DeleteHookProps } from '../../schemas/apiHookSchema';

const useDelete = <receivedDataSchema>({ path, queryKey, successToast, onDelete = () => {}, onError = () => {} }: DeleteHookProps<receivedDataSchema>) => {
	const queryClient = useQueryClient();
	return useMutation<receivedDataSchema, AxiosError, string>({
		mutationFn: (id: string) => apiClient.delete(`${path}/${id}`).then(res => res.data),
		onSuccess: (data: receivedDataSchema) => {
			toast.success(successToast);
			queryClient.invalidateQueries({ queryKey: [queryKey] });
			onDelete(data);
		},
		onError: ({ response }: AxiosError) => {
			toast.error(ErrorValidation(response!.data as string[]));
			onError();
		},
	});
};

export default useDelete;
