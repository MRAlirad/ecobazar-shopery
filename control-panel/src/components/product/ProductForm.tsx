import { useState } from 'react';
import classNames from 'classnames';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useGetCategoriesList } from '../../hooks/api';
import Card from '../Card';
import Modal from '../Modal';
import Input from '../Input';
import Textarea from '../Textarea';
import Select from '../Select';
import Button from '../Button';
import Icon from '../Icon';
import PageActionsBox from '../PageActionsBox';
import FormSchema from '../../schemas/FormSchema';
import ProductSchema, { ProductFormInputs } from '../../schemas/ProductSchema';
import { statuses } from '../../values';
import { FiUploadCloud } from 'react-icons/fi';
import { FaTrash } from 'react-icons/fa';
import ErrorMessage from '../ErrorMessage';

const ProductForm = ({
	mode,
	data,
	onAdd = () => {},
	isAdding = false,
	onEdit = () => {},
	isEditing = false,
	onDelete = () => {},
	isDeleting = false,
}: FormSchema<ProductSchema, ProductFormInputs>) => {
	const [imageModalDisplay, setImageModalDisplay] = useState(false);

	const formMethods = useForm<ProductFormInputs>({
		resolver: yupResolver(
			yup.object().shape({
				title: yup.string().required('Title is a required field'),
				description: yup.string().required('Description is a required field'),
				images: yup.array().of(yup.string().required()).min(1).required('Images is a required field'),
				price: yup.number().typeError('Price is a required field').required('Price is a required field').min(0),
				discount: yup.number().typeError('Discount is a required field').required('Discount is required field').min(0).max(100),
				count: yup.number().typeError('Count is required field').required('Count is required field').min(0),
				status: yup.number().typeError('Status is required field').required('Status is required field'),
				category: yup.string().required('Category is required field'),
			})
		),
		defaultValues: {
			title: data?.title ?? '',
			description: data?.description ?? '',
			images: data?.images ?? [],
			price: data?.price ?? 0,
			discount: data?.discount ?? 0,
			count: data?.count ?? 0,
			status: data?.status ?? statuses[0].value,
			category: data?.category?._id ?? '',
			// tag: data?.tag ?? '',
		},
	});
	const {
		handleSubmit,
		getValues,
		setValue,
		watch,
		formState: { errors },
	} = formMethods;

	const onSubmit = (formData: ProductFormInputs) => {
		if (mode === 'ADD') onAdd(formData);
		else if (mode === 'EDIT') onEdit(formData);
	};

	const { data: categories, isLoading } = useGetCategoriesList({ params: { display: 'all' } });

	return (
		<FormProvider {...formMethods}>
			<form className="grid grid-cols-[2fr_1fr] gap-6">
				<div className="space-y-6">
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
					<Card title="Image Gallery">
						<div className="grid grid-cols-4 gap-4">
							{watch('images').map((image, index) => (
								<div
									key={index}
									className="img-box relative bg-white border border-gray-200 rounded-lg shadow aspect-square"
								>
									<img
										src={image}
										alt="image"
									/>
									<Button
										color="red-outline"
										size="icon"
										icon={<FaTrash size="16" />}
										className="absolute top-2 start-2 z-10"
										onClick={() =>
											setValue(
												'images',
												getValues('images').filter((_, i) => i !== index)
											)
										}
									/>
								</div>
							))}
							<div
								className={classNames({
									'flex items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100': true,
									'h-64 col-span-4': watch('images').length === 0,
									'aspect-square': watch('images').length > 0,
									'!border-red-700': errors?.images && watch('images').length === 0,
								})}
								onClick={() => setImageModalDisplay(true)}
							>
								<div className="flex flex-col items-center justify-center gap-2 text-gray-500">
									<Icon size="36">
										<FiUploadCloud />
									</Icon>
									<p className="text-sm font-semibold">Click to upload</p>
									<p className="text-xs text-center">SVG, PNG, JPG or GIF</p>
								</div>
							</div>
						</div>
						{errors?.images?.message && watch('images').length === 0 && <ErrorMessage error={errors?.images.message} />}
					</Card>
					<Card title="Pricing">
						<div className="grid grid-cols-2 gap-4">
							<Input
								name="price"
								label="Price"
								type="number"
							/>
							<Input
								name="discount"
								label="Discount"
								type="number"
							/>
							<Input
								name="count"
								label="Count"
								type="number"
							/>
						</div>
					</Card>
				</div>
				<div className="space-y-6">
					<Card>
						<Select
							name="status"
							label="status"
							options={statuses}
						/>
					</Card>
					<Card>
						<Select
							name="category"
							label="Cateogry"
							isLoading={isLoading}
							isClearable
							options={categories ? categories.data.map(category => ({ label: category.title, value: category._id || '' })) : []}
						/>
					</Card>
				</div>
				<PageActionsBox
					{...{ mode, isAdding, isEditing, isDeleting, onDelete }}
					onAdd={handleSubmit(onSubmit)}
					onEdit={handleSubmit(onSubmit)}
					className="col-span-2"
				/>
			</form>
			{imageModalDisplay && (
				<ImageModal
					onAdd={(url: string) => setValue('images', [...getValues('images'), url])}
					onClose={() => setImageModalDisplay(false)}
				/>
			)}
		</FormProvider>
	);
};

interface ImageModalProps {
	onClose: () => void;
	onAdd: (value: string) => void;
}

type ImageModalInputs = {
	img: string;
};

const ImageModal = ({ onAdd, onClose }: ImageModalProps) => {
	const formMethods = useForm<ImageModalInputs>({
		resolver: yupResolver(
			yup.object().shape({
				img: yup.string().required('image path is required'),
			})
		),
		defaultValues: {
			img: '',
		},
	});

	return (
		<Modal
			title="Upload Image"
			onClose={onClose}
			className="max-w-screen-sm"
			actions={[
				{
					text: 'Upload',
					onClick: formMethods.handleSubmit(data => {
						onAdd(data.img);
						onClose();
					}),
				},
				{
					text: 'Cancel',
					color: 'red-outline',
					onClick: onClose,
				},
			]}
		>
			<FormProvider {...formMethods}>
				<Input
					name="img"
					label="Image"
				/>
			</FormProvider>
		</Modal>
	);
};

export default ProductForm;
