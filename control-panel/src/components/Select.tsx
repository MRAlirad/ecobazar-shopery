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

const Select = ({ label, className, defaultValue, name, placeholder = 'select one item', options, onChange = () => {} }: Props) => {
	const { control } = useFormContext();
	const { field, fieldState } = useController({
		control,
		name,
		defaultValue,
	});

	return (
		<div className={`grid gap-2 h-max ${className}`}>
			<label
				className={classNames({
					'block text-sm font-medium': true,
					'text-gray-900 dark:text-white': !fieldState.error,
					'text-red-700 dark:text-red-500': fieldState.error,
				})}
			>
				{label}
			</label>
			<select
				{...field}
				defaultValue={defaultValue}
				className={classNames({
					'border text-sm rounded-lg w-full p-2.5 outline-none': true,
					'bg-gray-50 text-gray-900 border-gray-300 focus:ring-blue-500 focus:border-blue-500': true,
					'dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500': true,
					'bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500': fieldState.error,
					'dark:text-red-500 dark:placeholder-red-500 dark:border-red-500': fieldState.error,
				})}
				onChange={e => {
					onChange(e.target.value);
					if (field) return field.onChange(e);
				}}
			>
				{options.length > 0 ? (
					<>
						<option value="">{placeholder}</option>
						{options.length > 0 &&
							options.map((option, index) => (
								<option
									key={index}
									value={option.value}
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
