import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Card from '../Card';
import Input from '../Input';
import PageActionsBox from '../PageActionsBox';
import CustomerSchema, { CustomerFormInputs } from '../../schemas/customerSchema';
import FormSchema from '../../schemas/FormSchema';

const CustomerForm = ({
	mode,
	data,
	onAdd = () => {},
	isAdding = false,
	onEdit = () => {},
	isEditing = false,
	onDelete = () => {},
	isDeleting = false,
}: FormSchema<CustomerSchema, CustomerFormInputs>) => {
	const formMethods = useForm<CustomerFormInputs>({
		resolver: yupResolver(
			yup.object().shape({
				firstName: yup.string().required('First Name is a required field'),
				lastName: yup.string().required('Last Name is a required field'),
				email: yup.string().email('Email is not valid').required('Email is a required field'),
				phone: yup.string().required('Phone is a required field'),
				address: yup.string().required('Address is a required field'),
			})
		),
		defaultValues: {
			firstName: data?.firstName ?? '',
			lastName: data?.lastName ?? '',
			email: data?.email ?? '',
			phone: data?.phone ?? '',
			address: data?.address ?? '',
		},
	});

	const onSubmit = (formData: CustomerFormInputs) => {
		if (mode === 'ADD') onAdd(formData);
		else if (mode === 'EDIT') onEdit(formData);
	};

	return (
		<FormProvider {...formMethods}>
			<form className="grid gap-6">
				<Card className="grid-cols-2">
					<Input name="firstName" label="First Name" />
					<Input name="lastName" label="Last Name" />
					<Input name="email" label="Email" />
					<Input name="phone" label="Phone" type="number" />
					<Input name="address" label="Address" className="col-span-2" />
				</Card>
				<PageActionsBox {...{ mode, isAdding, isEditing, isDeleting, onDelete }} onAdd={formMethods.handleSubmit(onSubmit)} onEdit={formMethods.handleSubmit(onSubmit)} />
			</form>
		</FormProvider>
	);
};

export default CustomerForm;
