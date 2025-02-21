import { useController, useFormContext } from 'react-hook-form';
import classNames from 'classnames';
import { ChangeEvent } from 'react';

interface Props {
	label: string;
	className?: string;
	defaultValue?: string;
	name: string;
	placeholder?: string;
	type?: string;
	onChange?: (value: string, e: ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ label, className = '', defaultValue, name, placeholder, type, onChange = () => {} }: Props) => {
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
			<input
				{...field}
				type={type}
				placeholder={placeholder}
				onChange={e => {
					onChange(e.target.value, e);
					if (field) return field.onChange(e);
				}}
			/>
			{fieldState.error && <span className="text-sm text-red-600 dark:text-red-500">{fieldState?.error?.message}</span>}
		</div>
	);
};

export default Input;
