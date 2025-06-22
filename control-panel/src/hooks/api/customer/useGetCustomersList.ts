import useGetList from '../useGetList';
import apiConfig from '../apiConfig';
import CustomerSchema from '../../../schemas/customerSchema';

const useGetCustomersList = ({ params }: { params?: string }) => {
	const { path, queryKey } = apiConfig.customer;
	return useGetList<CustomerSchema>({ path, queryKey, params });
};

export default useGetCustomersList;
