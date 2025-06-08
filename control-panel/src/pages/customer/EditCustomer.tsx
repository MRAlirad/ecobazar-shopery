import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useGetCustomer, useEditCustomer, useDeleteCustomer } from '../../hooks/api';
import Page from '../../components/Page';
import PageHeader from '../../components/PageHeader';
import Breadcrumb from '../../components/Breadcrumb';
import CustomerForm from '../../components/forms/CustomerForm';
import { FaUser } from 'react-icons/fa6';
import { FormSkeleton } from '../../components/Skeletons';
import DeleteModal from '../../components/DeleteModal';

const EditCustomer = () => {
	const { customerId } = useParams<{ customerId: string }>();
	const navigate = useNavigate();

	const [deleteModalDisplay, setDeleteModalDisplay] = useState(false);

	const { data: customer, isLoading: isCustomersloading } = useGetCustomer(customerId!);

	const editCustomer = useEditCustomer({
		id: customerId!,
		successToast: 'Product updated successfully',
		onEdit: () => navigate('/customer'),
	});

	const deleteCustomer = useDeleteCustomer({
		successToast: 'Product deleted successfully',
		onDelete: () => navigate('/customer'),
	});

	if (isCustomersloading) return <FormSkeleton />;

	return (
		<Page type="form">
			<Breadcrumb type="home" breadcrumb={[{ label: 'Customer List', icon: <FaUser /> }, { label: 'Edit Customer' }]} />
			<PageHeader title="Edit Customer" backLink="/customer" />
			<CustomerForm
				mode="EDIT"
				data={customer}
				onEdit={editCustomer.mutate}
				isEditing={editCustomer.isPending}
				onDelete={() => setDeleteModalDisplay(true)}
				isDeleting={deleteCustomer.isPending}
			/>
			{deleteModalDisplay && (
				<DeleteModal
					title={`Are you sure you want to delete the "${customer?.firstName} ${customer?.lastName}" customer?`}
					onClose={() => setDeleteModalDisplay(false)}
					onDelete={() => deleteCustomer.mutate(customerId!)}
					isDeleting={deleteCustomer.isPending}
				/>
			)}
		</Page>
	);
};

export default EditCustomer;
