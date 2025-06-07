import useAdd from '../useAdd';
import apiConfig from '../apiConfig';
import { AddProps } from '../../../schemas/apiHookSchema';
import CustomerSchema, { CustomerFormInputs } from '../../../schemas/customerSchema';

const useAddCustomer = ({ successToast, onAdd = () => {} }: AddProps<CustomerSchema>) => {
	const { path, queryKey } = apiConfig.customer;
	return useAdd<CustomerFormInputs, CustomerSchema>({ path, queryKey, successToast, onAdd });
};

export default useAddCustomer;
