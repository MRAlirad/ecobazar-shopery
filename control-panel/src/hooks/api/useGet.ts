import { useQuery } from '@tanstack/react-query';
import apiClient from './apiClient';
import { AxiosError } from 'axios';
import { GetHookProps } from '../../schemas/apiHookSchema';

const useGet = <T>({ path, queryKey }: GetHookProps) => {
	return useQuery<T, AxiosError>({
		queryKey: [queryKey],
		queryFn: () => apiClient.get<T>(path).then(res => res.data),
	});
};

export default useGet;
