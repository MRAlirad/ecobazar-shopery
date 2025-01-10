import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import apiClient from './apiClient';
import ErrorValidation from './../../components/ErrorValidation';
import { AddHookProps } from '../../schemas/apiHookSchema';

const useAdd = <sendDataSchema, receivedDataSchema>({ path, queryKey, successToast, onAdd = () => {}, onError = () => {} }: AddHookProps<receivedDataSchema>) => {
	const queryClient = useQueryClient();
	return useMutation<receivedDataSchema, AxiosError, sendDataSchema>({
		mutationFn: (data: sendDataSchema) => apiClient.post(path, data).then(res => res.data),
		onSuccess: (data: receivedDataSchema) => {
			toast.success(successToast);
			queryClient.invalidateQueries({ queryKey: [queryKey] });
			onAdd(data);
		},
		onError: ({ response }: AxiosError) => {
			toast.error(ErrorValidation(response!.data as string[]));
			onError();
		},
	});
};

export default useAdd;
