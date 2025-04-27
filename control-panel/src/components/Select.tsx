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
	options: { value: string | number; label: string }[];
	onChange?: (value: string) => void;
}

const Select = ({ label, name, className = '', defaultValue, disabled = false, readOnly = false, placeholder = 'select one item', options = [], onChange = () => {} }: Props) => {
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
			<select
				{...field}
				defaultValue={defaultValue}
				disabled={disabled || readOnly}
				onChange={e => {
					onChange(e.target.value);
					if (field) return field.onChange(e);
				}}
			>
				{options.length > 0 ? (
					<>
						<option
							value=""
							className="text-gray-400"
						>
							{placeholder}
						</option>
						{options.length > 0 &&
							options.map((option, index) => (
								<option
									key={index}
									value={option.value}
									className="text-gray-900"
								>
									{option.label}
								</option>
							))}
					</>
				) : (
					<option
						disabled
						value=""
					>
						-- nothing to select --
					</option>
				)}
			</select>
			{fieldState?.error?.message && <ErrorMessage error={fieldState?.error?.message} />}
		</div>
	);
};

export default Select;
