import { useState } from 'react';
import { useSearchParams } from 'react-router';
import { useFirstMountState } from 'react-use';
import { useGetCustomersList, useDeleteCustomer } from '../../hooks/api';
import { ListSkeleton } from '../../components/Skeletons';
import Page from '../../components/Page';
import Breadcrumb from '../../components/Breadcrumb';
import PageHeader from '../../components/PageHeader';
import Table from '../../components/Table';
import DeleteModal from '../../components/DeleteModal';
import { FaUser } from 'react-icons/fa6';
import { FaTrash, FaPen } from 'react-icons/fa';

const CustomersList = () => {
	const [searchParams] = useSearchParams();
	const [deleteModalDisplay, setDeleteModalDisplay] = useState<null | string>(null);
	const isFirstMount = useFirstMountState();

	const { data: customers, isLoading: isCustomersloading } = useGetCustomersList({ params: searchParams.toString() });

	const deleteCustomer = useDeleteCustomer({
		successToast: 'Product deleted successfully',
	});

	if (isFirstMount && isCustomersloading) return <ListSkeleton />;

	return (
		<Page type="list">
			<Breadcrumb type="home" breadcrumb={[{ label: 'Customer List', icon: <FaUser /> }]} />
			<PageHeader title="Customer List" action={{ text: 'Add Customer', to: '/customer/add' }} />

			<Table
				columns={[
					{ name: 'name', label: 'Customer name' },
					{ name: 'phone', label: 'Phone' },
					{ name: 'email', label: 'Email' },
					{ name: 'address', label: 'Address' },
					{ name: 'action', label: '' },
				]}
				rows={(() => {
					const rows = [];

					if (customers)
						for (const { _id, firstName, lastName, phone, email, address } of customers.data) {
							rows.push([
								{ name: 'name', value: `${firstName} ${lastName}` },
								{ name: 'phone', value: phone },
								{ name: 'email', value: email },
								{ name: 'address', value: address },
								{
									name: 'action',
									actions: [
										{
											text: 'edit',
											icon: <FaPen size={16} />,
											className: 'hover:!bg-neutral-100 !text-neutral-500',
											to: `/customer/${_id}`,
										},
										{
											text: 'delete',
											icon: <FaTrash size={16} />,
											className: 'hover:!bg-red-100 !text-red-500',
											loading: deleteCustomer.isPending,
											onClick: () => setDeleteModalDisplay(_id),
										},
									],
									component: deleteModalDisplay === _id && (
										<DeleteModal
											title={`Are you sure you want to delete the "${firstName} ${lastName}" customer?`}
											onDelete={() => deleteCustomer.mutate(_id)}
											onClose={() => setDeleteModalDisplay(null)}
											isDeleting={deleteCustomer.isPending}
										/>
									),
								},
								{
									name: 'link',
									link: `/customer/${_id}`,
								},
							]);
						}

					return rows;
				})()}
				isLoading={isCustomersloading}
				pagination={{
					currentPage: +(searchParams.get('page') ?? '1'),
					totalPages: customers?.totalPages || 1,
				}}
			/>
		</Page>
	);
};

export default CustomersList;
