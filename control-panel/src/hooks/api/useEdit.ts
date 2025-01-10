import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import apiClient from './apiClient';
import ErrorValidation from './../../components/ErrorValidation';
import { EditHookProps } from '../../schemas/apiHookSchema';

const useEdit = <sendDataSchema, receivedDataSchema>({ id, path, queryKey, successToast, onEdit = () => {}, onError = () => {} }: EditHookProps<receivedDataSchema>) => {
	const queryClient = useQueryClient();
	return useMutation<receivedDataSchema, AxiosError, sendDataSchema>({
		mutationFn: (data: sendDataSchema) => apiClient.patch(`${path}/${id}`, data).then(res => res.data),
		onSuccess: (data: receivedDataSchema) => {
			toast.success(successToast);
			queryClient.invalidateQueries({ queryKey: [queryKey] });
			onEdit(data);
		},
		onError: ({ response }: AxiosError) => {
			toast.error(ErrorValidation(response!.data as string[]));
			onError();
		},
	});
};

export default useEdit;
