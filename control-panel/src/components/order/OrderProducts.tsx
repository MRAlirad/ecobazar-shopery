import { useFormContext } from 'react-hook-form';
import Card from '../Card';
import Table from '../Table';
import { useState } from 'react';
import ProductsListModal from '../ProductsListModal';
import Button from '../Button';
import { FaTimes } from 'react-icons/fa';
import Input from '../Input';
import ProductSchema from '../../schemas/ProductSchema';
import { numberToCurrency } from '../../helpers/Number';

const OrderProducts = () => {
	const { watch, setValue, getValues } = useFormContext();
	const [productModalDisplay, setProductModalDisplay] = useState(false);

	console.log(watch('products'));
	console.log(getValues('products'));

	return (
		<Card title="Products" action={{ text: 'Add Product', color: 'blue-outline', onClick: () => setProductModalDisplay(true) }}>
			<Table
				columns={[
					{ name: 'product', label: 'ProductName' },
					{ name: 'quantity', label: 'Count' },
					{ name: 'total', label: 'Total' },
					{ name: 'action', label: '' },
				]}
				rows={(() => {
					const rows = [];

					for (const { _id, title, price, images, quantity, total } of watch('products')) {
						rows.push([
							{
								name: 'product',
								component: (
									<div className="flex items-center gap-2 max-w-60">
										<div className="img-box size-10 min-w-10 aspect-square rounded">
											<img src={images[0]} alt={title} className="object-cover" />
										</div>
										<div className="grid gap-1">
											<h4 title={title} className="text-xs line-clamp-3">
												{title}
											</h4>
											<span className="font-normal">$ {numberToCurrency(+price)}</span>
										</div>
									</div>
								),
							},
							{
								name: 'quantity',
								component: (
									<Input
										name={`quantity-${_id}`}
										type="number"
										defaultValue={quantity}
										className="max-w-20"
										min={1}
										onChange={value => {
											setValue(
												'products',
												getValues('products').map((pr: ProductSchema) => (pr._id === _id ? { ...pr, quantity: value, total: +value * +pr.price } : pr))
											);
										}}
									/>
								),
							},
							{
								name: 'total',
								component: `$ ${numberToCurrency(+total)}`,
							},
							{
								name: 'action',
								component: (
									<Button
										color="red-outline"
										size="icon"
										icon={<FaTimes size={12} />}
										// className="text-gray-500 hover:bg-gray-100 !p-2"
										onClick={() => {
											setValue(
												'products',
												getValues('products').filter((pr: ProductSchema) => pr._id !== _id)
											);
											setValue(`quantity-${_id}`, 1);
										}}
									/>
								),
							},
						]);
					}
					return rows;
				})()}
				hasRowColumn={false}
			/>
			{productModalDisplay && (
				<ProductsListModal
					onAdd={selectedProducts => setValue('products', [...getValues('products'), ...selectedProducts.map(pr => ({ ...pr, total: +pr.price, quantity: 1 }))])}
					selectedProductIds={getValues('products').map(({ _id }: ProductSchema) => _id)}
					onClose={() => setProductModalDisplay(false)}
				/>
			)}
		</Card>
	);
};

export default OrderProducts;

// /* eslint-disable react-hooks/exhaustive-deps */
// import { useIntl } from 'react-intl';
// import { useState } from 'react';
// import { useFormContext } from 'react-hook-form';
// import ProductsListModal from '../ProductsListModal';
// import Card from '../Card';
// import Table from '../Table';
// import Input from '../Input';
// import Button from '../Button';
// import { numberToCurrency } from '../../helpers/Number';
// import { FiImage } from 'react-icons/fi';
// import { TbCurrencyIranianRial } from 'react-icons/tb';
// import { FaTimes } from 'react-icons/fa';
// import { ProductImgPath } from '../../helpers/Image';

// const SelectedOrderProducts = () => {
// 	const {
// 		messages: {
// 			order: {
// 				form: {
// 					selectProduct: { title, addProductBtn, tableColumns },
// 				},
// 			},
// 		},
// 	} = useIntl();

// 	const [productModalDisplay, setProductModalDisplay] = useState(false);

// 	const { setValue, getValues, watch } = useFormContext();

// 	return (
// 		<Card
// 			title={title}
// 			action={{ text: addProductBtn, color: 'white', onClick: () => setProductModalDisplay(true) }}
// 		>
// 			<Table
// 				key={watch('products')}
// 				columns={[
// 					{
// 						name: 'product',
// 						label: tableColumns.product,
// 						className: 'w-1/2',
// 					},
// 					{
// 						name: 'inventory',
// 						label: tableColumns.inventory,
// 						className: 'w-1/6',
// 					},
// 					{
// 						name: 'total',
// 						label: tableColumns.total,
// 						className: 'w-2/6',
// 					},
// 					{
// 						name: 'action',
// 						label: '',
// 					},
// 				]}
// 				rows={(() => {
// 					const rows = [];

// 					for (const { productId, variantId, title, firstImageId, price, quantity, total, variants } of watch('products')) {
// 						rows.push([
// 							{
// 								name: 'product',
// 								component: (
// 									<div className="max-w-60 grid sm:grid-cols-[max-content_1fr] items-center gap-x-3">
// 										<div className="hidden sm:img-box border size-10 min-w-10 rounded row-span-2">
// 											{firstImageId && <img src={ProductImgPath(firstImageId)} />}
// 											{!firstImageId && <FiImage className="text-gray-500" />}
// 										</div>
// 										<div className="flex flex-col gap-1">
// 											<h4
// 												title={title}
// 												className="text-xs line-clamp-3"
// 											>
// 												{title}
// 											</h4>
// 											<span className="font-normal">{numberToCurrency(+price)} ریال</span>
// 											{variants?.length > 0 && (
// 												<div className="grid gap-1">
// 													{variants?.map(({ variantOptionId, variantOptionName, variantValueId, variantValueName }) => (
// 														<div
// 															key={`${variantOptionId}-${variantValueId}`}
// 															className="flex items-center gap-1"
// 														>
// 															<span className="text-xs">{variantOptionName} :</span>
// 															<span className="text-xs">{variantValueName}</span>
// 														</div>
// 													))}
// 												</div>
// 											)}
// 										</div>
// 									</div>
// 								),
// 							},
// 							{
// 								name: 'inventory',
// 								className: '!p-1 font-normal',
// 								component: (
// 									<Input
// 										name={`quantity-${variantId ?? productId}`}
// 										type="number"
// 										hideArrow={false}
// 										defaultValue={quantity}
// 										min={1}
// 										className="max-w-20"
// 										onChange={value => {
// 											if (variantId)
// 												setValue(
// 													'products',
// 													getValues('products').map(pr => (pr.variantId === variantId ? { ...pr, quantity: value, total: +value * +pr.price } : pr))
// 												);
// 											else
// 												setValue(
// 													'products',
// 													getValues('products').map(pr => (pr.productId === productId ? { ...pr, quantity: value, total: +value * +pr.price } : pr))
// 												);
// 										}}
// 									/>
// 								),
// 							},
// 							{
// 								name: 'total',
// 								className: '!pe-3',
// 								component: (
// 									<div className="flex items-center gap-2">
// 										{numberToCurrency(+total)}
// 										<TbCurrencyIranianRial />
// 									</div>
// 								),
// 							},
// 							{
// 								name: 'action',
// 								component: (
// 									<Button
// 										color="simple"
// 										size="small"
// 										icon={<FaTimes size={12} />}
// 										className="text-gray-500 hover:bg-gray-100 !p-2"
// 										onClick={() => {
// 											if (variantId) {
// 												setValue(
// 													'products',
// 													getValues('products').filter(pr => pr.variantId !== variantId)
// 												);
// 												setValue(`quantity-${variantId}`, 1);
// 											} else {
// 												setValue(
// 													'products',
// 													getValues('products').filter(pr => pr.productId !== productId)
// 												);
// 												setValue(`quantity-${productId}`, 1);
// 											}
// 										}}
// 									/>
// 								),
// 							},
// 						]);
// 					}

// 					return rows;
// 				})()}
// 				hasRowColumn={false}
// 			/>

// 			{productModalDisplay && (
// 				<ProductsListModal
// 					selectedProductIds={getValues('products').map(({ variantId, productId }) => ({ variantId, productId }))}
// 					onAdd={selectedProducts => {
// 						setValue('products', [...getValues('products'), ...selectedProducts.map(pr => ({ ...pr, total: +pr.price, quantity: 1, custom: false }))]);
// 					}}
// 					onClose={() => setProductModalDisplay(false)}
// 				/>
// 			)}
// 		</Card>
// 	);
// };

// export default SelectedOrderProducts;
