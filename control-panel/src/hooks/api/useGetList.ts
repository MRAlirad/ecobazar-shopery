import { useQuery } from '@tanstack/react-query';
import apiClient from './apiClient';
import { AxiosError } from 'axios';
import { GetListProps } from '../../schemas/apiHookSchema';

const useGetList = <T>({ path, queryKey }: GetListProps) => {
	return useQuery<T[], AxiosError>({
		queryKey: [queryKey],
		queryFn: () => apiClient.get<T[]>(path).then(res => res.data),
	});
};

export default useGetList;
