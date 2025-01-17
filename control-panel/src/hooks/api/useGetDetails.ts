import { useQuery } from '@tanstack/react-query';
import apiClient from './apiClient';
import { AxiosError } from 'axios';
import { GetDetailsHookProps } from '../../schemas/apiHookSchema';

const useGetDetails = <T>({ path, queryKey, id }: GetDetailsHookProps) => {
	return useQuery<T, AxiosError>({
		queryKey: [queryKey, id],
		queryFn: () => apiClient.get<T>(`${path}/${id}`).then(res => res.data),
	});
};

export default useGetDetails;
