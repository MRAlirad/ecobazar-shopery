import { useQuery } from '@tanstack/react-query';
import apiClient from './apiClient';
import { AxiosError } from 'axios';
import { GetProps } from '../../schemas/apiHookSchema';

const useGet = <T>({ path, queryKey, id }: GetProps) => {
	return useQuery<T, AxiosError>({
		queryKey: [queryKey, id],
		queryFn: () => apiClient.get<T>(`${path}/${id}`).then(res => res.data),
	});
};

export default useGet;
