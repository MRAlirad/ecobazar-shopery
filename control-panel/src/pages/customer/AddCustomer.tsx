import { useNavigate } from 'react-router';
import { useAddCustomer } from '../../hooks/api';
import Page from '../../components/Page';
import PageHeader from '../../components/PageHeader';
import Breadcrumb from '../../components/Breadcrumb';
import CustomerForm from '../../components/forms/CustomerForm';
import { FaUser } from 'react-icons/fa6';

const AddCustomer = () => {
	const navigate = useNavigate();
	const addCustomer = useAddCustomer({
		successToast: 'Customer Added Successfully',
		onAdd: () => navigate('/customer'),
	});

	return (
		<Page type="form">
			<Breadcrumb type="home" breadcrumb={[{ label: 'Customer List', icon: <FaUser /> }]} />
			<PageHeader title="Add Customer" backLink="/customer" />
			<CustomerForm mode="ADD" onAdd={addCustomer.mutate} isAdding={addCustomer.isPending} />
		</Page>
	);
};

export default AddCustomer;
