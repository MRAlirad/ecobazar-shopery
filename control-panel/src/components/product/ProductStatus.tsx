import { statuses } from '../../values';
import Card from '../Card';
import Select from '../Select';

const ProductStatus = () => {
	return (
		<Card>
			<Select name="status" label="status" options={statuses} />
		</Card>
	);
};

export default ProductStatus;
