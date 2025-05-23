import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Card from '../Card';
import Input from '../Input';
import Textarea from '../Textarea';
import PageActionsBox from '../PageActionsBox';
import FormSchema from '../../schemas/FormSchema';
import CategorySchema, { CategoryFormInputs } from '../../schemas/categorySchema';

const CategoryForm = ({
	mode,
	data,
	onAdd = () => {},
	isAdding = false,
	onEdit = () => {},
	isEditing = false,
	onDelete = () => {},
	isDeleting = false,
}: FormSchema<CategorySchema, CategoryFormInputs>) => {
	const formMethods = useForm<CategoryFormInputs>({
		resolver: yupResolver(
			yup.object().shape({
				title: yup.string().required('Title is a required field'),
				description: yup.string().required('Description is a required field'),
			})
		),
		defaultValues: {
			title: data?.title ?? '',
			description: data?.description ?? '',
		},
	});
	const { handleSubmit } = formMethods;

	const onSubmit = (formData: CategoryFormInputs) => {
		if (mode === 'ADD') onAdd(formData);
		else if (mode === 'EDIT') onEdit(formData);
	};

	return (
		<FormProvider {...formMethods}>
			<form
				className="grid gap-6"
				onSubmit={handleSubmit(onSubmit)}
			>
				<Card>
					<Input
						name="title"
						label="Title"
						placeholder="enter the title"
					/>
					<Textarea
						name="description"
						label="Description"
					/>
				</Card>
				<PageActionsBox
					{...{ mode, isAdding, isEditing, isDeleting, onDelete }}
					onAdd={handleSubmit(onSubmit)}
					onEdit={handleSubmit(onSubmit)}
				/>
			</form>
		</FormProvider>
	);
};

export default CategoryForm;
