import { useFieldArray, useFormContext } from 'react-hook-form';
import Card from '../Card';
import EmptyBox from '../EmptyBox';
import Divider from '../Divider';
import { FaPlus } from 'react-icons/fa6';
import Button from '../Button';
import Input from '../Input';
import { HiOutlineTrash } from 'react-icons/hi';

const ProductAttributes = () => {
	const { control } = useFormContext();
	const { fields, append, remove } = useFieldArray({
		control,
		name: 'attributes',
	});

	return (
		<Card title="Attributes">
			{fields.length === 0 && <EmptyBox title="No Attributes Added" />}
			{fields.length > 0 && (
				<div className="grid gap-1">
					{fields.map((field, index) => (
						<AttributeItem key={field.id} index={index} onRemove={() => remove(index)} />
					))}
				</div>
			)}
			<Divider />
			<Button text="Add Attribute" color="simple" size="small" className="!text-blue-600" icon={<FaPlus size={13} />} onClick={() => append({ label: '', value: '' })} />
		</Card>
	);
};

const AttributeItem = ({ index, onRemove }: AttrItemProps) => {
	return (
		<div className="grid grid-cols-[1fr_1fr_max-content] gap-2">
			<Input name={`attributes.${index}.label`} label={index === 0 ? 'Attribute Name' : ''} placeholder="Enter Attribute Name" />
			<Input name={`attributes.${index}.value`} label={index === 0 ? 'Attribute Value' : ''} placeholder="Enter Attribute Value" />
			<Button color="simple" size="small" icon={<HiOutlineTrash size={20} />} onClick={onRemove} className="!text-red-700 mt-auto hover:bg-red-200 size-8" />
		</div>
	);
};

interface AttrItemProps {
	index: number;
	onRemove: () => void;
}

export default ProductAttributes;
