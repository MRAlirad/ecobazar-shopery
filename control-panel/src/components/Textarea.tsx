import { useController, useFormContext } from 'react-hook-form';
import classNames from 'classnames';

interface Props {
	label: string;
	className?: string;
	defaultValue?: string;
	name: string;
	placeholder?: string;
	onChange?: (value: string) => void;
}

const Textarea = ({ label, className = '', defaultValue, name, placeholder, onChange = () => {} }: Props) => {
	const { control } = useFormContext();
	const { field, fieldState } = useController({
		control,
		name,
		defaultValue,
	});

	return (
		<div
			className={classNames({
				'form-input': true,
				error: fieldState.error,
				[className]: className,
			})}
		>
			<label>{label}</label>
			<textarea
				{...field}
				className='min-h-64'
				placeholder={placeholder}
				onChange={e => {
					onChange(e.target.value);
					if (field) return field.onChange(e);
				}}
			></textarea>
			{fieldState.error && <span className="text-sm text-red-600 dark:text-red-500">{fieldState?.error?.message}</span>}
		</div>
	);
};

export default Textarea;
