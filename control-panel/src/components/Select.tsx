import { useController, useFormContext } from 'react-hook-form';
import classNames from 'classnames';
import Button from './Button';
import Loader from './Loader';
import { IoIosClose } from 'react-icons/io';
import ErrorMessage from './ErrorMessage';

interface Props {
	label: string;
	name: string;
	isClearable?: boolean;
	isLoading?: boolean;
	disabled?: boolean;
	readOnly?: boolean;
	className?: string;
	defaultValue?: string;
	placeholder?: string;
	noOptionsMsg?: string;
	options: { value: string | number; label: string; disabled?: boolean }[];
	onChange?: (value: string) => void;
}

const Select = ({
	label,
	name,
	className = '',
	defaultValue,
	isClearable = false,
	isLoading = false,
	disabled = false,
	readOnly = false,
	placeholder = 'select one item',
	noOptionsMsg = 'no Option to select',
	options = [],
	onChange = () => {},
}: Props) => {
	const { control, watch, setValue } = useFormContext();
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
			<div className="relative">
				<select
					{...field}
					className={classNames({
						'cursor-pointer': true,
						'!text-gray-400': watch(name) === '' || isLoading,
					})}
					defaultValue={defaultValue}
					disabled={disabled || readOnly}
					onChange={e => {
						onChange(e.target.value);
						if (field) return field.onChange(e);
					}}
				>
					{isLoading ? (
						<option
							disabled
							value={field.value}
						>
							-- Loading Data --
						</option>
					) : options.length > 0 ? (
						<>
							{watch(name) === '' && (
								<option
									value=""
									disabled
								>
									{placeholder}
								</option>
							)}
							{options.length > 0 &&
								options.map((option, index) => (
									<option
										key={index}
										value={option.value}
										className={`${option.disabled ? 'text-gray-400' : 'text-gray-900'}`}
										disabled={option.disabled}
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
							-- {noOptionsMsg} --
						</option>
					)}
				</select>
				{watch(name) !== '' && isClearable && (
					<Button
						color="simple"
						icon={<IoIosClose />}
						size="small"
						className="absolute end-3 top-0.5"
						onClick={() => {
							setValue(name, '');
							onChange('');
						}}
					/>
				)}
				{isLoading && (
					<Loader
						className="absolute end-6 top-0 w-max text-borderDefault"
						size="16"
					/>
				)}
			</div>
			{fieldState?.error?.message && <ErrorMessage error={fieldState?.error?.message} />}
		</div>
	);
};

export default Select;
