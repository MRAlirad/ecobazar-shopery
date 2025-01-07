import { useQuery } from '@tanstack/react-query';
import apiClient from './apiClient';
import { AxiosError } from 'axios';
import { GetHookProps } from '../../schemas/apiHookSchema';

const useGet = <T>({ path, queryKey, id }: GetHookProps) => {
	return useQuery<T, AxiosError>({
		queryKey: [queryKey, id],
		queryFn: () => apiClient.get<T>(`${path}/${id}`).then(res => res.data),
	});
};

export default useGet;
