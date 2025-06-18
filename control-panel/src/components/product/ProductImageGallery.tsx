import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import classNames from 'classnames';
import { useState } from 'react';
import { useFormContext, useForm, FormProvider } from 'react-hook-form';
import { FaTrash } from 'react-icons/fa6';
import { FiUploadCloud } from 'react-icons/fi';
import Button from '../Button';
import Card from '../Card';
import ErrorMessage from '../ErrorMessage';
import Icon from '../Icon';
import Input from '../Input';
import Modal from '../Modal';

const ProductImageGallery = () => {
	const {
		getValues,
		setValue,
		watch,
		formState: { errors },
	} = useFormContext();

	const [imageModalDisplay, setImageModalDisplay] = useState(false);

	return (
		<>
			<Card title="Image Gallery">
				<div className="grid grid-cols-4 gap-4">
					{watch('images').map((image: string, index: number) => (
						<div key={index} className="img-box relative bg-white border border-gray-200 rounded-lg shadow aspect-square">
							<img src={image} alt="image" />
							<Button
								color="red-outline"
								size="icon"
								icon={<FaTrash size="16" />}
								className="absolute top-2 start-2 z-10"
								onClick={() =>
									setValue(
										'images',
										getValues('images').filter((_: string, i: number) => i !== index)
									)
								}
							/>
						</div>
					))}
					<div
						className={classNames({
							'flex items-center justify-center text-gray-500 w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100': true,
							'h-64 col-span-4': watch('images').length === 0,
							'aspect-square': watch('images').length > 0,
							'!border-red-700 !bg-red-50 text-red-500': errors?.images && watch('images').length === 0,
						})}
						onClick={() => setImageModalDisplay(true)}
					>
						<div className="flex flex-col items-center justify-center gap-2">
							<Icon size="36">
								<FiUploadCloud />
							</Icon>
							<p className="text-sm font-semibold">Click to upload</p>
							<p className="text-xs text-center">SVG, PNG, JPG or GIF</p>
						</div>
					</div>
				</div>
				{errors?.images?.message && watch('images').length === 0 && <ErrorMessage error={String(errors?.images.message ?? '')} />}
			</Card>
			{imageModalDisplay && <ImageModal onAdd={(url: string) => setValue('images', [...getValues('images'), url])} onClose={() => setImageModalDisplay(false)} />}
		</>
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
				<Input name="img" label="Image" />
			</FormProvider>
		</Modal>
	);
};

interface ImageModalProps {
	onClose: () => void;
	onAdd: (value: string) => void;
}

type ImageModalInputs = {
	img: string;
};

export default ProductImageGallery;
