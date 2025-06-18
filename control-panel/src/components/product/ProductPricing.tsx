import Card from '../Card';
import Input from '../Input';

const ProductPricing = () => {
	return (
		<Card title="ProductPricing">
			<div className="grid grid-cols-2 gap-4">
				<Input name="price" label="Price" type="number" />
				<Input name="discount" label="Discount" type="number" />
				<Input name="count" label="Count" type="number" />
			</div>
		</Card>
	);
};

export default ProductPricing;
