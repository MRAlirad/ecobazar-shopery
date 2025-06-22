import { useFormContext } from 'react-hook-form';
import { Link } from 'react-router';
import { useGetCustomer, useGetCustomersList } from '../../hooks/api';
import Card from '../Card';
import Select from '../Select';
import { IoClose } from 'react-icons/io5';

const OrderCustomer = () => {
	const { setValue, watch } = useFormContext();

	const { data: customers, isLoading: isCustomersLoading } = useGetCustomersList({});
	const { data: customer } = useGetCustomer(watch('customer'));

	return (
		<Card
			title="Customer"
			{...(customer && {
				action: {
					icon: <IoClose size={16} />,
					onClick: () => {
						setValue('customer', '');
					},
				},
			})}
		>
			{customer && (
				<div className="grid gap-2 text-xs">
					<Link to={`/customer/${customer?._id}`} className="text-blue-600 text-sm" target="_blank">
						{customer?.firstName} {customer?.lastName}
					</Link>
					<div className="grid gap-1">
						<span className="text-sm font-bold">Contact Info</span>
						<span>{customer?.email}</span>
						<span>{customer?.phone}</span>
					</div>
					<div className="grid gap-1">
						<span className="text-sm font-bold">Address</span>
						<span>{customer?.address}</span>
					</div>
				</div>
			)}
			{!customer && (
				<Select
					name="customer"
					clearable
					options={customers?.data ? customers?.data.map(cu => ({ label: `${cu.firstName} ${cu.lastName}`, value: cu._id })) : []}
					loading={isCustomersLoading}
				/>
			)}
		</Card>
	);
};

export default OrderCustomer;
