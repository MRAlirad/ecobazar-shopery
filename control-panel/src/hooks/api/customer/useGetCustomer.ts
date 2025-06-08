import useGetDetails from '../useGetDetails';
import apiConfig from '../apiConfig';
import CustomerSchema from '../../../schemas/customerSchema';

const useGetCustomer = (id: string) => {
	const { path, queryKey } = apiConfig.customer;
	return useGetDetails<CustomerSchema>({ path, queryKey, id });
};

export default useGetCustomer;
