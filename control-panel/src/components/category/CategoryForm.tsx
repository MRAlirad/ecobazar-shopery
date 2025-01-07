import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Input from '../Input';
import Textarea from '../Textarea';
import PageActionsBox from '../PageActionsBox';
import FormSchema from '../../schemas/FormSchema';
import CategorySchema from '../../schemas/categorySchema';

const CategoryForm = ({ mode, data, onAdd = () => {}, isAdding = false, onEdit = () => {}, isEditing = false, onDelete = () => {}, isDeleting = false }: FormSchema<CategorySchema>) => {
	const formMethods = useForm<CategorySchema>({
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

	const onSubmit = (formData: CategorySchema) => {
		if (mode === 'ADD') onAdd(formData);
		else if (mode === 'EDIT') onEdit(formData);
	};

	return (
		<FormProvider {...formMethods}>
			<form
				// className="grid grid-cols-[2fr_1fr] gap-6"
				onSubmit={handleSubmit(onSubmit)}
			>
				<div className="card">
					<Input
						name="title"
						label="Title"
						placeholder="enter the title"
					/>
					<Textarea
						name="description"
						label="Description"
					/>
				</div>
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
