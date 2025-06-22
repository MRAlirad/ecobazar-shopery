import useGetList from '../useGetList';
import apiConfig from '../apiConfig';
import OrderSchema from '../../../schemas/OrderSchema';

const useGetOrdersList = () => {
	const { path, queryKey } = apiConfig.order;
	return useGetList<OrderSchema>({ path, queryKey });
};

export default useGetOrdersList;
