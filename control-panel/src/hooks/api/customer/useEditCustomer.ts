import useEdit from '../useEdit';
import apiConfig from '../apiConfig';
import { EditProps } from '../../../schemas/apiHookSchema';
import CustomerSchema, { CustomerFormInputs } from '../../../schemas/customerSchema';

const useEditCustomer = ({ id, successToast, onEdit = () => {} }: EditProps<CustomerSchema>) => {
	const { path, queryKey } = apiConfig.customer;
	return useEdit<CustomerFormInputs, CustomerSchema>({ id, path, queryKey, successToast, onEdit });
};

export default useEditCustomer;
