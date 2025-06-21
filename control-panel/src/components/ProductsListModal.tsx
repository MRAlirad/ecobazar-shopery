import { useState } from 'react';
import { useGetProductsList } from '../hooks/api';
import { TableSkeleton } from './Skeletons';
import Modal from './Modal';
import EmptyBox from './EmptyBox';
import Icon from './Icon';
import { numberToCurrency } from '../helpers/Number';
import { FaRegSquare, FaCheckSquare } from 'react-icons/fa';
import ProductSchema from '../schemas/ProductSchema';
import classNames from 'classnames';

const ProductsListModal = ({ selectedProductIds = [], onAdd, onClose }: ProductsListModalProps) => {
	const [selectedProducts, setSelectedProducts] = useState<ProductSchema[]>([]);

	const { data: productsList, isLoading: isProductsListLoading, error: productsError } = useGetProductsList({ params: '' });

	return (
		<Modal
			title="Select Product"
			onClose={onClose}
			className="md:max-w-3xl md:min-w-[700px]"
			actions={[
				{
					text: 'Add Products',
					disabled: selectedProducts.length === 0,
					onClick: () => {
						onAdd(selectedProducts);
						onClose();
					},
				},
				{
					color: 'red-outline',
					text: 'Cancel',
					onClick: onClose,
				},
			]}
		>
			{isProductsListLoading && <TableSkeleton count={3} />}

			{productsList?.data?.length === 0 && <EmptyBox title="There is no product" />}

			{productsError && <div>{productsError?.message}</div>}

			{productsList?.data && productsList?.data.length > 0 && (
				<div className="border rounded-md">
					{productsList?.data.map(product => (
						<ProductItem key={product._id} {...product} selectedProductIds={selectedProductIds} selectedProducts={selectedProducts} setSelectedProducts={setSelectedProducts} />
					))}
				</div>
			)}
		</Modal>
	);
};

const ProductItem = ({
	_id,
	title,
	images,
	count,
	price,
	attributes,
	category,
	description,
	discount,
	status,
	selectedProductIds,
	selectedProducts,
	setSelectedProducts,
}: ProductItemProps & ProductSchema) => {
	const isInSelectedProducts = () => {
		return selectedProducts.find((pr: ProductSchema) => pr._id === _id) ? true : false;
	};

	const isInSelectedProductIds = () => {
		return selectedProductIds.find((productId: string) => productId === _id) ? true : false;
	};

	const addToSelectedProducts = (product: ProductSchema) => {
		setSelectedProducts([...selectedProducts, product]);
	};

	const removeFromSelectedProducts = () => {
		setSelectedProducts(selectedProducts.filter(pr => pr._id !== _id));
	};

	return (
		<div
			key={_id}
			className={classNames({
				'grid grid-cols-[1fr_max-content] items-center gap-2 px-4 py-1 border-b select-none': true,
				'opacity-50': isInSelectedProductIds(),
			})}
			onClick={() => {
				if (isInSelectedProductIds()) return;
				if (isInSelectedProducts()) removeFromSelectedProducts();
				else addToSelectedProducts({ _id, title, images, count, price, attributes, category, description, discount, status });
			}}
		>
			<div className="flex items-center gap-2">
				<div className="img-box size-14 aspect-square rounded">
					<img src={images[0]} alt={title} className="object-cover" />
				</div>
				<div className="grid gap-1">
					<span className="text-sm line-clamp-1">{title}</span>
					<span className="text-xs text-neutral-600">{`${count ?? 0} item(s)`}</span>
					<span className="text-xs text-neutral-600">{`$${price ? numberToCurrency(+price) : '-----'}`}</span>
				</div>
			</div>
			<Icon>{isInSelectedProducts() || isInSelectedProductIds() ? <FaCheckSquare size={20} /> : <FaRegSquare size={20} />}</Icon>
		</div>
	);
};

interface ProductsListModalProps {
	onAdd: (products: ProductSchema[]) => void;
	selectedProductIds: string[];
	onClose: () => void;
}

interface ProductItemProps {
	selectedProducts: ProductSchema[];
	selectedProductIds: string[];
	setSelectedProducts: (products: ProductSchema[]) => void;
}

export default ProductsListModal;

// import PropTypes from 'prop-types';
// import classNames from 'classnames';
// import { useState } from 'react';
// import { useIntl } from 'react-intl';
// import { FormProvider, useForm } from 'react-hook-form';
// import { useGetProductsList, useGetVariantsList } from '../hooks/api';
// import { TableSkeleton } from './Skeletons';
// import Pagination from './Pagination';
// import Modal from './Modal';
// import Input from './Input';
// import Button from './Button';
// import EmptyBox from './EmptyBox';
// import Error from './Error';
// import Icon from './Icon';
// import { ProductItemSkeleton } from './Skeletons';
// import { numberToCurrency } from '../helpers/Number';
// import { ProductImgPath } from '../helpers/Image';
// import { FiImage } from 'react-icons/fi';
// import { IoIosArrowBack } from 'react-icons/io';
// import { FaRegSquare, FaCheckSquare } from 'react-icons/fa';

// const ProductsListModal = ({ selectedProductIds = [], closeAfterAdd = true, onAdd, onClose, isAdding = false }) => {
// 	const {
// 		messages: {
// 			components: {
// 				productsListModal: { title, addBtn, cancelBtn },
// 			},
// 		},
// 	} = useIntl();

// 	const formMethods = useForm();
// 	const [params, setParams] = useState({ page: 5, search: '' });
// 	const [selectedProducts, setSelectedProducts] = useState([]);

// 	const { data: productsResult, isLoading: isProductsLoading, error: productsError } = useGetProductsList({ params });

// 	return (
// 		<Modal
// 			title={title}
// 			onClose={onClose}
// 			className="md:max-w-3xl md:min-w-[700px]"
// 			actions={[
// 				{
// 					text: addBtn,
// 					disabled: selectedProducts.length === 0,
// 					loading: isAdding,
// 					onClick: () => {
// 						onAdd(selectedProducts);
// 						if (closeAfterAdd) onClose();
// 					},
// 				},
// 				{
// 					color: 'outline-red',
// 					text: cancelBtn,
// 					onClick: onClose,
// 				},
// 			]}
// 		>
// 			<FormProvider {...formMethods}>
// 				<Input label="جست و جو محصول" name="search" onChange={value => setParams({ page: 1, search: value })} className="mb-4" />
// 			</FormProvider>

// 			{isProductsLoading ? (
// 				<TableSkeleton count={3} />
// 			) : productsError || productsResult?.status === false ? (
// 				<Error type="component" errors={productsError?.message || productsResult?.errors} />
// 			) : productsResult?.products.length === 0 ? (
// 				<EmptyBox />
// 			) : (
// 				<div className="grid gap-4">
// 					<div className="border rounded-md">
// 						{productsResult?.products.map(({ id, title, firstImageId, pricing, quantity }) => (
// 							<ProductItem key={id} price={pricing.price} {...{ id, title, firstImageId, selectedProductIds, quantity, selectedProducts, setSelectedProducts }} />
// 						))}
// 					</div>
// 					<Pagination currentPage={params.page} pageCount={productsResult?.pageCount} onChangePage={page => setParams({ ...params, page })} />
// 				</div>
// 			)}
// 		</Modal>
// 	);
// };

// const ProductItem = ({ id, title, firstImageId, price, quantity, selectedProductIds, selectedProducts, setSelectedProducts }) => {
// 	const { data: variants, isLoading: isVariantsListLoading, error: variantsError } = useGetVariantsList(id);
// 	const [variantDisplay, setVariantDisplay] = useState(false);

// 	const isInSelectedProductIds = (type, id) => {
// 		// type => 'variant' | 'product' // id => productId | variantId
// 		if (type === 'product') return selectedProductIds.find(pr => pr.productId === id) ? true : false;
// 		else if (type === 'variant') return selectedProductIds.find(pr => pr.variantId === id) ? true : false;
// 	};

// 	const canChooseProduct = () => {
// 		if (variants.length > 0) return false;
// 		if (selectedProductIds.find(pr => pr.productId === id)) return false;
// 		return true;
// 	};

// 	const isInSelectedProducts = (type, id) => {
// 		// type => 'variant' | 'product' // id => productId | variantId
// 		if (type === 'product') return selectedProducts.find(pr => pr.productId === id) ? true : false;
// 		else if (type === 'variant') return selectedProducts.find(pr => pr.variantId === id) ? true : false;
// 	};

// 	const addToSelectedProducts = (productId, variantId, variants, variantPrice) => {
// 		setSelectedProducts([
// 			...selectedProducts,
// 			{
// 				title,
// 				productId,
// 				firstImageId,
// 				price: variantPrice ?? price,
// 				...(variantId && {
// 					variantId,
// 					variants,
// 				}),
// 			},
// 		]);
// 	};

// 	const removeFromSelectedProducts = (type, id) => {
// 		// type => 'variant' | 'product' // id => productId | variantId
// 		if (type === 'product') setSelectedProducts(selectedProducts.filter(pr => pr.productId !== id));
// 		else if (type === 'variant') setSelectedProducts(selectedProducts.filter(pr => pr.variantId !== id));
// 	};

// 	if (isVariantsListLoading) return <ProductItemSkeleton />;

// 	if (variantsError || variants?.status === false) return <Error type="component" errors={variantsError?.message || variants?.errors} />;

// 	return (
// 		<div className="grid grid-cols-[max-content_1fr] items-center gap-2 px-4 py-1 border-b">
// 			<Button
// 				color="simple"
// 				onClick={() => setVariantDisplay(prev => !prev)}
// 				icon={<IoIosArrowBack />}
// 				size="small"
// 				className={`${variantDisplay && '-rotate-90'}`}
// 				disabled={variants.length === 0}
// 			/>
// 			<div
// 				className={classNames({
// 					'grid grid-cols-[1fr_max-content] items-center gap-2 cursor-pointer': true,
// 					'opacity-50': isInSelectedProductIds('product', id) && variants.length === 0,
// 				})}
// 				onClick={() => {
// 					if (!canChooseProduct()) return;
// 					if (isInSelectedProducts('product', id)) removeFromSelectedProducts('product', id);
// 					else addToSelectedProducts(id);
// 				}}
// 			>
// 				<div className="grid grid-cols-[max-content_1fr] items-center gap-2">
// 					<div className="img-box border size-12 min-w-12 rounded">
// 						{firstImageId && <img src={ProductImgPath(firstImageId)} />}
// 						{!firstImageId && <FiImage className="text-gray-500" />}
// 					</div>
// 					<div className="grid gap-1">
// 						<span className="text-sm line-clamp-1">{title}</span>
// 						<span className="text">{`${quantity ?? 0} عدد`}</span>
// 						<span className="text">{`${price ? numberToCurrency(+price) : '-----'} ریال`}</span>
// 					</div>
// 				</div>
// 				<Icon className={`${variants?.length > 0 ? 'opacity-50' : ''}`}>
// 					{selectedProductIds.find(pr => pr.productId === id) ? <FaCheckSquare size={20} /> : isInSelectedProducts('product', id) ? <FaCheckSquare size={20} /> : <FaRegSquare size={20} />}
// 				</Icon>
// 			</div>
// 			{variantDisplay && (
// 				<div className="grid gap-1 col-[1/4] px-5 sm:px-10">
// 					{variants?.map(variant => (
// 						<div
// 							key={variant.variantId}
// 							className={classNames({
// 								'grid grid-cols-[max-content_1fr_max-content] items-center gap-4 cursor-pointer': true,
// 								'opacity-50': isInSelectedProductIds('variant', variant.variantId),
// 							})}
// 							onClick={() => {
// 								if (isInSelectedProductIds('variant', variant.variantId)) return;
// 								if (isInSelectedProducts('variant', variant.variantId)) removeFromSelectedProducts('variant', variant.variantId);
// 								else addToSelectedProducts(id, variant.variantId, variant.optionsAndValues, variant.pricing.price);
// 							}}
// 						>
// 							<span className="text-sm">{generateVariantName(variant.optionsAndValues)}</span>
// 							<span className="border-b border-dashed border-black"></span>
// 							<Icon>
// 								{isInSelectedProductIds('variant', variant.variantId) || isInSelectedProducts('variant', variant.variantId) ? <FaCheckSquare size={20} /> : <FaRegSquare size={20} />}
// 							</Icon>
// 						</div>
// 					))}
// 				</div>
// 			)}
// 		</div>
// 	);
// };

// function generateVariantName(optionsAndValues) {
// 	const output = [];
// 	for (const value of optionsAndValues) output.push(value.variantValueName);

// 	return output.join(' / ');
// }

// ProductsListModal.propTypes = {
// 	selectedProductIds: PropTypes.arrayOf(
// 		PropTypes.shape({
// 			productId: PropTypes.number,
// 			variantId: PropTypes.number,
// 		})
// 	),
// 	closeAfterAdd: PropTypes.bool,
// 	onAdd: PropTypes.func.isRequired,
// 	onClose: PropTypes.func.isRequired,
// 	isAdding: PropTypes.bool,
// };

// ProductItem.propTypes = {
// 	id: PropTypes.number,
// 	title: PropTypes.string,
// 	firstImageId: PropTypes.number,
// 	price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
// 	quantity: PropTypes.number,
// 	selectedProductIds: PropTypes.arrayOf(
// 		PropTypes.shape({
// 			productId: PropTypes.number,
// 			variantId: PropTypes.number,
// 		})
// 	),
// 	selectedProducts: PropTypes.array,
// 	setSelectedProducts: PropTypes.func,
// };

// export default ProductsListModal;
