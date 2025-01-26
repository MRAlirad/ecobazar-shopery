import { useQuery } from '@tanstack/react-query';
import apiClient from './apiClient';
import { AxiosError } from 'axios';
import { GetListProps } from '../../schemas/apiHookSchema';

const useGetDropdownList = <T>({ path, queryKey }: GetListProps) => {
	return useQuery<T[], AxiosError>({
		queryKey: [queryKey, 'dropdown'],
		queryFn: () => apiClient.get<T[]>(`${path}/dropdown`).then(res => res.data),
	});
};

export default useGetDropdownList;
