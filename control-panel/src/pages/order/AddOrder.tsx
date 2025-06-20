import Breadcrumb from '../../components/Breadcrumb';
import Page from '../../components/Page';
import { HiMiniFolderOpen } from 'react-icons/hi2';
import PageHeader from '../../components/PageHeader';
import OrderForm from '../../components/order/OrderForm';

const AddOrder = () => {
	return (
		<Page type="form">
			<Breadcrumb type="home" breadcrumb={[{ label: 'Orders List', icon: <HiMiniFolderOpen />, link: '/order' }, { label: 'ADD Order' }]} />

			<PageHeader title="ADD Order" backLink="/order" />
            
            <OrderForm />
		</Page>
	);
};

export default AddOrder;
