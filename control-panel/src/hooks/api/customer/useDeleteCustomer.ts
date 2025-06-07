import useDelete from '../useDelete';
import apiConfig from '../apiConfig';
import { DeleteProps } from '../../../schemas/apiHookSchema';
import CustomerSchema from '../../../schemas/customerSchema';

const useDeleteCustomer = ({ successToast, onDelete = () => {} }: DeleteProps<CustomerSchema>) => {
	const { path, queryKey } = apiConfig.customer;
	return useDelete<CustomerSchema>({ path, queryKey, successToast, onDelete });
};

export default useDeleteCustomer;
