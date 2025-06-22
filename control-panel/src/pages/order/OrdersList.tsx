import Page from '../../components/Page';
import Breadcrumb from '../../components/Breadcrumb';
import PageHeader from '../../components/PageHeader';
import { HiMiniFolderOpen } from 'react-icons/hi2';
import Table from '../../components/Table';
import { FaTrash, FaPen } from 'react-icons/fa';
// import { numberToCurrency } from '../../helpers/Number';
import Badge from '../../components/Badge';
import { useGetOrdersList } from '../../hooks/api';
import { ListSkeleton } from '../../components/Skeletons';

const OrdersList = () => {
	const { data: orders, isLoading: isOrdersLoading } = useGetOrdersList();

	if (isOrdersLoading) return <ListSkeleton />;

	return (
		<Page type="list">
			<Breadcrumb type="home" breadcrumb={[{ label: 'Orders List', icon: <HiMiniFolderOpen /> }]} />

			<PageHeader title="Orders List" action={{ text: 'Add Order', to: '/order/add' }} />

			<Table
				columns={[
					{ name: 'orderId', label: 'order ID' },
					{ name: 'date', label: 'Date' },
					{ name: 'customer', label: 'Customer' },
					{ name: 'status', label: 'Status' },
					{ name: 'totalPrice', label: 'Total Price' },
					{ name: 'action', label: '' },
				]}
				rows={(() => {
					const rows = [];
					if (orders)
						for (const { _id, customer, status } of orders.data) {
							rows.push([
								{
									name: 'order',
									value: `# O ${_id}`,
								},
								// {
								// 	name: 'date',
								// 	value: date,
								// },
								{
									name: 'customer',
									value: customer,
								},
								{
									name: 'status',
									component: <Badge text={status} color="blue" />,
								},
								// {
								// 	name: 'total',
								// 	value: `$${numberToCurrency(+totalPrice)}`,
								// },
								{
									name: 'action',
									actions: [
										{
											text: 'edit',
											icon: <FaPen size={16} />,
											className: 'hover:!bg-neutral-100 !text-neutral-500',
											to: `/order/${_id}`,
										},
										{
											text: 'delete',
											icon: <FaTrash size={16} />,
											className: 'hover:!bg-red-100 !text-red-500',
											// loading: deleteProduct.isPending,
											// onClick: () => setDeleteModalDisplay(_id),
										},
									],
									// component: deleteModalDisplay === _id && (
									// 	<DeleteModal
									// 		title={`Are you sure you want to delete the "${title}" product?`}
									// 		onDelete={() => deleteProduct.mutate(_id)}
									// 		onClose={() => setDeleteModalDisplay(null)}
									// 		isDeleting={deleteProduct.isPending}
									// 	/>
									// ),
								},
								{
									name: 'link',
									link: `/order/${_id}`,
								},
							]);
						}
					return rows;
				})()}
			/>
		</Page>
	);
};

export default OrdersList;
