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

const Textarea = ({ label, className, defaultValue, name, placeholder,  onChange = () => {} }: Props) => {
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
			<textarea
				{...field}
				className={classNames({
					'border text-sm rounded-lg w-full p-2.5 min-h-64 outline-none': true,
					'bg-gray-50 text-gray-900 border-gray-300 focus:ring-blue-500 focus:border-blue-500': true,
					'dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500': true,
					'bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500': fieldState.error,
					'dark:text-red-500 dark:placeholder-red-500 dark:border-red-500': fieldState.error,
				})}
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
