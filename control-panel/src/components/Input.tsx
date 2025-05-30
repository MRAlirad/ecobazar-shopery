import { useController, useFormContext } from 'react-hook-form';
import classNames from 'classnames';
import { ChangeEvent } from 'react';
import ErrorMessage from './ErrorMessage';

interface Props {
	label: string;
	name: string;
	disabled?: boolean;
	readOnly?: boolean;
	className?: string;
	defaultValue?: string;
	placeholder?: string;
	type?: string;
	onChange?: (value: string, e: ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ label, name, className = '', defaultValue, disabled = false, readOnly = false, placeholder, type, onChange = () => {} }: Props) => {
	const { control } = useFormContext();
	const { field, fieldState } = useController({
		control,
		name,
		defaultValue,
		disabled,
	});

	return (
		<div
			className={classNames({
				'form-input': true,
				error: fieldState.error,
				disabled: disabled,
				readonly: readOnly,
				[className]: className,
			})}
		>
			<label>{label}</label>
			<input
				{...field}
				disabled={disabled || readOnly}
				type={type}
				placeholder={placeholder}
				onChange={e => {
					onChange(e.target.value, e);
					if (field) return field.onChange(e);
				}}
			/>
			{fieldState?.error?.message && <ErrorMessage error={fieldState?.error?.message} />}
		</div>
	);
};

export default Input;
