import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import PageActionsBox from '../PageActionsBox';
import FormSchema from '../../schemas/FormSchema';
import ProductSchema, { ProductFormInputs } from '../../schemas/ProductSchema';
import { statuses } from '../../values';
import TitleDescription from './TitleDescription';
import ProductImageGallery from './ProductImageGallery';
import ProductPricing from './ProductPricing';
import ProductStatus from './ProductStatus';
import ProductCategory from './ProductCategory';

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
		},
	});
	const { handleSubmit } = formMethods;

	const onSubmit = (formData: ProductFormInputs) => {
		if (mode === 'ADD') onAdd(formData);
		else if (mode === 'EDIT') onEdit(formData);
	};

	return (
		<FormProvider {...formMethods}>
			<form className="grid grid-cols-[2fr_1fr] gap-6">
				<div className="space-y-6">
					<TitleDescription />
					<ProductImageGallery />
					<ProductPricing />
				</div>
				<div className="space-y-6">
					<ProductStatus />
					<ProductCategory />
				</div>
				<PageActionsBox {...{ mode, isAdding, isEditing, isDeleting, onDelete }} onAdd={handleSubmit(onSubmit)} onEdit={handleSubmit(onSubmit)} className="col-span-2" />
			</form>
		</FormProvider>
	);
};

export default ProductForm;
