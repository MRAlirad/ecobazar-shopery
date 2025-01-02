import { FormProvider, useForm } from 'react-hook-form';
import Modal from '../Modal';
import Input from '../Input';
import Textarea from '../Textarea';
import Select from '../Select';
import Icon from '../Icon';
import { FiUploadCloud } from 'react-icons/fi';
import { useState } from 'react';

interface ImageModalProps {
	onClose: () => void;
	// onAdd: ()=> void;
}

const ProductForm = () => {
	const statuses = [
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
	const formMethods = useForm();
	const { handleSubmit } = formMethods;

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
					<div className="card">
						<div
							className="flex items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
							onClick={() => setImageModalDisplay(true)}
						>
							<div className="flex flex-col items-center justify-center gap-2 text-gray-500 dark:text-gray-400">
								<Icon size="36">
									<FiUploadCloud />
								</Icon>
								<p className="text-sm font-semibold">Click to upload</p>
								<p className="text-xs">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
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
			</form>
			{imageModalDisplay && <ImageModal onClose={() => setImageModalDisplay(false)} />}
		</FormProvider>
	);
};

const ImageModal = ({ onClose }: ImageModalProps) => {
	return (
		<Modal
			title="Upload Image"
			onClose={onClose}
			className="max-w-screen-sm"
			actions={[
				{
					text: 'Upload',
				},
				{
					text: 'Cancel',
					color: 'red-outline',
					onClick: onClose,
				},
			]}
		>
			<Input
				name="img"
				label="Image"
			/>
		</Modal>
	);
};

export default ProductForm;
