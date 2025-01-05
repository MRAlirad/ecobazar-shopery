import { useState } from 'react';
import classNames from 'classnames';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Modal from '../Modal';
import Input from '../Input';
import Textarea from '../Textarea';
import Select from '../Select';
import Button from '../Button';
import Icon from '../Icon';
import PageActionsBox from '../PageActionsBox';
import FormSchema from '../../schemas/FormSchema';
import ProductSchema from '../../schemas/ProductSchema';
import { statuses } from '../../values';
import { FiUploadCloud } from 'react-icons/fi';
import { FaTrash } from 'react-icons/fa';

const ProductForm = ({ mode, data, onAdd = () => {}, isAdding = false, onEdit = () => {}, isEditing = false }: FormSchema<ProductSchema>) => {
	const [imageModalDisplay, setImageModalDisplay] = useState(false);

	const formMethods = useForm<ProductSchema>({
		resolver: yupResolver(
			yup.object().shape({
				title: yup.string().required('Title is a required field'),
				description: yup.string().required('Title is a required field'),
				images: yup.array().of(yup.string().required()).min(1).required('Images is a required field'),
				price: yup.number().typeError('Price is a required field').required('Price is a required field'),
				discount: yup.number().typeError('Discount is a required field').required('Discount is required field').min(0).max(100),
				count: yup.number().typeError('Count is required field').required('Count is required field'),
				status: yup.number().typeError('Status is required field').required('Status is required field'),
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
			// category: data?.category ?? 0,
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

	const onSubmit = (formData: ProductSchema) => {
		const output = {
			title: formData.title,
			description: formData.description,
			images: formData.images,
			price: +formData.price,
			discount: +formData.discount,
			count: +formData.count,
			status: formData.status,
		};

		if (mode === 'ADD') onAdd(output);
		else if (mode === 'EDIT') onEdit(output);
	};

	return (
		<FormProvider {...formMethods}>
			<form
				className="grid grid-cols-[2fr_1fr] gap-6"
				onSubmit={handleSubmit(onSubmit)}
			>
				<div className="space-y-6">
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
					<div className="card grid grid-cols-4">
						{watch('images').map((image, index) => (
							<div
								key={index}
								className="img-box relative bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 aspect-square"
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
								/>
							</div>
						))}
						<div
							className={classNames({
								'flex items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 dark:hover:border-gray-500':
									true,
								'h-64 col-span-4': watch('images').length === 0,
								'aspect-square': watch('images').length > 0,
								'!border-red-700': errors?.images && watch('images').length === 0,
							})}
							onClick={() => setImageModalDisplay(true)}
						>
							<div className="flex flex-col items-center justify-center gap-2 text-gray-500 dark:text-gray-400">
								<Icon size="36">
									<FiUploadCloud />
								</Icon>
								<p className="text-sm font-semibold">Click to upload</p>
								<p className="text-xs text-center">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
							</div>
						</div>
						{errors?.images && watch('images').length === 0 && <span className="col-span-4 text-sm text-red-600 dark:text-red-500">{errors?.images.message}</span>}
					</div>
					<div className="card grid-cols-2">
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
				</div>
				<div className="space-y-6">
					<div className="card">
						<Select
							name="status"
							label="status"
							options={statuses}
						/>
					</div>
					{/* <div className="card">
						<Select
							name="category"
							label="Cateogry"
							options={[]}
						/>
						<Input
							name="tag"
							label="Tags"
						/>
					</div> */}
				</div>
				<PageActionsBox
					mode={mode}
					onAdd={handleSubmit(onSubmit)}
					onEdit={handleSubmit(onSubmit)}
					isAdding={isAdding}
					isEditing={isEditing}
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
