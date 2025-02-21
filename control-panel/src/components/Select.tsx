import { useController, useFormContext } from 'react-hook-form';
import classNames from 'classnames';

interface Props {
	label: string;
	className?: string;
	defaultValue?: string;
	name: string;
	placeholder?: string;
	options: { value: string | number; label: string }[];
	onChange?: (value: string) => void;
}

const Select = ({ label, className = '', defaultValue, name, placeholder = 'select one item', options = [], onChange = () => {} }: Props) => {
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
			<select
				{...field}
				defaultValue={defaultValue}
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
			{fieldState.error && <span className="text-sm text-red-600 dark:text-red-500">{fieldState?.error?.message}</span>}
		</div>
	);
};

export default Select;
