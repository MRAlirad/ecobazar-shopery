import { useQuery } from '@tanstack/react-query';
import apiClient from './apiClient';
import { AxiosError } from 'axios';
import { GetListProps } from '../../schemas/apiHookSchema';
import { SearchParamsToObject } from '../../helpers/Object';

interface GetList<T> {
	data: T[];
	currentPage: number;
	totalPages: number;
}

const useGetList = <T>({ path, queryKey, params }: GetListProps) => {
	return useQuery<GetList<T>, AxiosError>({
		queryKey: params ? [queryKey, params] : [queryKey],
		queryFn: () =>
			apiClient
				.get<GetList<T>>(path, {
					params: {
						...(params && typeof params === 'string' ? SearchParamsToObject() : params ? params : {}),
					},
				})
				.then(res => res.data),
	});
};

export default useGetList;
