import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import apiClient from './apiClient';
import ErrorValidation from './../../components/ErrorValidation';
import { PostHookProps } from '../../schemas/apiHookSchema';

const usePost = <sendDataSchema, receivedDataSchema>({ path, queryKey, successToast, onSuccess = () => {}, onError = () => {} }: PostHookProps<receivedDataSchema>) => {
	const queryClient = useQueryClient();
	return useMutation<receivedDataSchema, AxiosError, sendDataSchema>({
		mutationFn: (data: sendDataSchema) => apiClient.post(path, data).then(res => res.data),
		onSuccess: (data: receivedDataSchema) => {
			toast.success(successToast);
			queryClient.invalidateQueries({ queryKey: [queryKey] });
			onSuccess(data);
		},
		onError: ({ response }: AxiosError) => {
			toast.error(ErrorValidation(response!.data as string[]));
			onError();
		},
	});
};

export default usePost;
