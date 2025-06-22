import { useController, useFormContext } from 'react-hook-form';
import classNames from 'classnames';
import ErrorMessage from './ErrorMessage';

interface Props {
	label: string;
	name: string;
	disabled?: boolean;
	readOnly?: boolean;
	className?: string;
	defaultValue?: string;
	placeholder?: string;
	onChange?: (value: string) => void;
}

const Textarea = ({ label, name, className = '', defaultValue, disabled = false, readOnly = false, placeholder= '', onChange = () => {} }: Props) => {
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
			{label && <label>{label}</label>}
			<textarea
				{...field}
				disabled={disabled || readOnly}
				className="min-h-32"
				placeholder={placeholder}
				onChange={e => {
					onChange(e.target.value);
					if (field) return field.onChange(e);
				}}
			></textarea>
			{fieldState?.error?.message && <ErrorMessage error={fieldState?.error?.message} />}
		</div>
	);
};

export default Textarea;
