import classNames from 'classnames';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Modal from '../Modal';
import Input from '../Input';
import Textarea from '../Textarea';
import Select from '../Select';
import Icon from '../Icon';
import { FiUploadCloud } from 'react-icons/fi';
import { useState } from 'react';
import Button from '../Button';
import { FaTrash } from "react-icons/fa";

interface ImageModalProps {
	onClose: () => void;
	onAdd: (value: string) => void;
}

type ProductFormInputs = {
	title: string;
	description: string;
	images: string[];
	price: string;
	discount: string;
	count: string;
	status: string;
	category: string;
	tag: string;
};

type ImageModalInputs = {
	img: string;
};

const ProductForm = () => {
	const statuses: { value: number; label: string }[] = [
		{
			value: 1,
			label: 'Active',
		},
		{
			value: 2,
			label: 'Deactive',
		},
		{
			value: 3,
			label: 'Archived',
		},
	];

	const [imageModalDisplay, setImageModalDisplay] = useState(false);

	const formMethods = useForm<ProductFormInputs>({
		defaultValues: {
			title: '',
			description: '',
			images: [],
			price: '',
			discount: '',
			count: '',
			status: '',
			category: '',
			tag: '',
		},
	});
	const { handleSubmit, getValues, setValue, watch } = formMethods;

	return (
		<FormProvider {...formMethods}>
			<form
				className="grid grid-cols-[2fr_1fr] gap-6"
				onSubmit={handleSubmit(data => console.log(data))}
			>
				<div className="space-y-6">
					<div className="card">
						<Input
							name="title"
							label="Title"
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
									size='icon'
									icon={<FaTrash size='16' />}
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
					</div>
					<div className="card grid-cols-2">
						<Input
							name="price"
							label="Price"
						/>
						<Input
							name="discount"
							label="Discount"
						/>
						<Input
							name="count"
							label="Count"
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
					<div className="card">
						<Select
							name="category"
							label="Cateogry"
							options={[]}
						/>
						<Input
							name="tag"
							label="Tags"
						/>
					</div>
				</div>
				<div className="actions-box"></div>
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
