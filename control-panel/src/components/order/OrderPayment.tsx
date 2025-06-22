// import { useState } from 'react';
import { numberToCurrency } from '../../helpers/Number';
import Button from '../Button';
import Card from '../Card';
import { useFormContext } from 'react-hook-form';

const OrderPayment = () => {
	const { watch } = useFormContext();

	return (
		<Card title="Payment">
			<div className="grid grid-cols-3 gap-4 text-xs border border-gray-300 p-4 rounded-lg">
				{/* Products Count and Total Price */}
				<span>Products Cost</span>
				<span> {`${calculateProductsCount(watch('products'))} item(s)`} </span>
				<span className="justify-self-end"> {`$ ${calculateProductsPrice(watch('products'))}`} </span>
				{/* Shopping */}
				<Button
					color="simple"
					text="Add Shipping"
					size="small"
					className="!text-blue-700"
					// onClick={() => setShippingDeliveryModalDisplay(true)}
					// disabled={watch('products').length === 0}
				/>
				<span></span>
				<span className="justify-self-end">$ {numberToCurrency(watch('shippingCost') ? +watch('shippingCost') : 0)}</span>
				{/* Total Price */}
				<span className="font-semibold text-xs">Total Cost</span>
				<span></span>
				<span className="justify-self-end">$ {calculateTotalPrice(watch('products'), watch('shippingCost'))}</span>
			</div>
		</Card>
	);
};

export default OrderPayment;

// import { useIntl } from 'react-intl';
// import PropTypes from 'prop-types';
// import { useState } from 'react';
// import { FormProvider, useForm, useFormContext } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from 'yup';
// import { useGetDiscountsList } from '../../hooks/api';
// import Card from '../Card';
// import Modal from '../Modal';
// import Select from '../Select';
// import Input from '../Input';
// import Button from '../Button';
// import Checkbox from '../Checkbox';
// import { numberToCurrency } from '../../helpers/Number';
// import { discountAmountType } from '../../helpers/values';
// import { FiPercent } from 'react-icons/fi';
// import { TbCurrencyIranianRial } from 'react-icons/tb';
// import { Pick } from '../../helpers/Object';

// const OrderPayment = ({ discountData, setDiscountData }) => {
// 	const {
// 		messages: {
// 			order: {
// 				form: {
// 					payment: { title, productAmount, addDiscount, addShipping, total, currencyLabel, item, discount, text },
// 				},
// 			},
// 		},
// 	} = useIntl();

// 	const [discountModalDisplay, setDiscountModalDisplay] = useState(false);
// 	const [shippingDeliveryModalDisplay, setShippingDeliveryModalDisplay] = useState(false);
// 	const { getValues, setValue, watch } = useFormContext();

// 	return (
// 		<Card title={title}>
// 			<div className="grid grid-cols-[max-content_max-content_1fr] gap-4 text-xs border border-gray-300 p-4 rounded-lg">
// 				{/* تعدادو مبلغ کل */}
// 				<span>{productAmount}</span>
// 				<span> {`${calculateProductsCount(watch('products'))} ${item}`} </span>
// 				<span className="justify-self-end"> {`${calculateProductsPrice(watch('products'))} ${currencyLabel}`} </span>

// 				{/* تخفیف */}
// 				<Button
// 					color="simple"
// 					text={addDiscount}
// 					size="small"
// 					className="font-normal text-blue-600"
// 					onClick={() => setDiscountModalDisplay(true)}
// 					// disabled={watch('products').length === 0}
// 					disabled
// 				/>
// 				<span>{discountData?.discountReason ? discountData?.discountReason : discountData ? discount : '—'}</span>
// 				<span className="justify-self-end">
// 					{/* {numberToCurrency(+calculateDiscount(discountData?.discountTypeId, +watch('products').reduce((acc, product) => +product.total + acc, 0), discountData?.discountValue))}{' '} */}
// 					0 {currencyLabel}
// 				</span>

// 				{/* حمل و نقل */}
// 				<Button
// 					color="simple"
// 					text={addShipping}
// 					size="small"
// 					className="font-normal text-blue-600"
// 					onClick={() => setShippingDeliveryModalDisplay(true)}
// 					disabled={watch('products').length === 0}
// 				/>
// 				<span>{watch('shippingName') || '—'}</span>
// 				<span className="justify-self-end">
// 					{numberToCurrency(watch('shippingCost') ? +watch('shippingCost') : 0)} {currencyLabel}
// 				</span>

// 				{/* جمع کل */}
// 				<span className="font-semibold text-xs">{total}</span>
// 				<span></span>
// 				<span className="justify-self-end">
// 					{calculateTotalPrice(watch('products'), watch('shippingCost'))}
// 					{currencyLabel}
// 				</span>
// 			</div>
// 			<p className="text">{text}</p>
// 			{discountModalDisplay && (
// 				<DiscountModal
// 					data={discountData ?? {}}
// 					onAdd={formData => setDiscountData(formData)}
// 					onClose={() => setDiscountModalDisplay(false)}
// 				/>
// 			)}
// 			{shippingDeliveryModalDisplay && (
// 				<ShippingDeliveryOption
// 					data={{
// 						name: getValues('shippingName') ?? '',
// 						price: getValues('shippingCost') ?? '',
// 					}}
// 					onAdd={({ name, price }) => {
// 						setValue('shippingName', name);
// 						setValue('shippingCost', price);
// 					}}
// 					onRemove={() => {
// 						setValue('shippingName', '');
// 						setValue('shippingCost', '');
// 					}}
// 					onClose={() => setShippingDeliveryModalDisplay(false)}
// 				/>
// 			)}
// 		</Card>
// 	);
// };

// const DiscountModal = ({ data = {}, onAdd, onClose }) => {
// 	const {
// 		messages: {
// 			order: {
// 				form: {
// 					discoutModal: {
// 						title,
// 						submitBtn,
// 						cancelBtn,
// 						discountCodeDropdown,
// 						eligibleDiscontsCheckbox,
// 						customeDiscountCheckbox,
// 						discountTypeDropdown,
// 						discountValueInput,
// 						discountReasonInput,
// 					},
// 				},
// 			},
// 		},
// 	} = useIntl();

// 	const { data: discountsList, isLoading: isDiscountsListLoading, error: discountError } = useGetDiscountsList({});
// 	const formMehtods = useForm({
// 		defaultValues: {
// 			discountId: data.discountId ?? '',
// 			eligibleDisconts: data.eligibleDisconts ?? false,
// 			customeDiscount: data.customeDiscount ?? false,
// 			discountValue: data.discountValue ?? '',
// 			discountReason: data.discountReason ?? '',
// 			discountType: data.discountTypeId ?? 1,
// 		},
// 	});
// 	const { watch, setValue, handleSubmit } = formMehtods;

// 	const onSubmit = formData => {
// 		const output = {
// 			...Pick(formData, ['eligibleDisconts', 'customeDiscount']),
// 			...(!formData.eligibleDisconts && { discountId: formData.discount?.value }),
// 			...(formData.customeDiscount && {
// 				...Pick(formData, ['discountValue', 'discountReason']),
// 				discountTypeId: +formData.discountType,
// 			}),
// 		};
// 		// console.log(output);
// 		onAdd(output);
// 		onClose();
// 	};

// 	console.log(isDiscountsListLoading);

// 	return (
// 		<Modal
// 			title={title}
// 			onClose={onClose}
// 			className="md:max-w-md"
// 			actions={[
// 				{
// 					text: submitBtn,
// 					onClick: handleSubmit(onSubmit),
// 				},
// 				{
// 					color: 'outline-red',
// 					text: cancelBtn,
// 					onClick: onClose,
// 				},
// 			]}
// 		>
// 			<FormProvider {...formMehtods}>
// 				<div className="space-y-6">
// 					<Select
// 						name="discountId"
// 						label={discountCodeDropdown}
// 						options={discountsList?.map(({ code, title, id }) => ({ label: code ?? title, value: id }))}
// 						isLoading={isDiscountsListLoading}
// 						clearable
// 						disabled={watch('eligibleDisconts')}
// 						error={discountError?.message || discountsList?.errors}
// 					/>
// 					<Checkbox
// 						name="eligibleDisconts"
// 						label={eligibleDiscontsCheckbox}
// 						onChange={() => setValue('discountId', '')}
// 					/>
// 					<Checkbox
// 						name="customeDiscount"
// 						label={customeDiscountCheckbox}
// 					/>
// 					{watch('customeDiscount') && (
// 						<div className="grid xs:grid-cols-2 gap-4">
// 							<Select
// 								name="discountType"
// 								label={discountTypeDropdown}
// 								options={discountAmountType}
// 								onChange={() => setValue('discountValue', '')}
// 							/>
// 							<Input
// 								name="discountValue"
// 								label={discountValueInput}
// 								leftIcon={+watch('discountType') === 1 ? <FiPercent /> : +watch('discountType') === 2 ? <TbCurrencyIranianRial /> : ''}
// 								type="number"
// 								hideArrow={+watch('discountType') === 2}
// 							/>
// 							<Input
// 								name="discountReason"
// 								label={discountReasonInput}
// 								className="xs:col-span-2"
// 							/>
// 						</div>
// 					)}
// 				</div>
// 			</FormProvider>
// 		</Modal>
// 	);
// };

// const ShippingDeliveryOption = ({ data = {}, onAdd, onRemove, onClose }) => {
// 	const {
// 		messages: {
// 			order: {
// 				form: {
// 					shippingDeliveryModal: {
// 						title,
// 						submitBtn,
// 						cancelBtn,
// 						removeBtn,
// 						nameInput,
// 						priceInput,
// 						validationMessages: { nameRequired, priceRequired },
// 					},
// 				},
// 			},
// 		},
// 	} = useIntl();

// 	const formMehtods = useForm({
// 		resolver: yupResolver(
// 			yup.object().shape({
// 				name: yup.string().required(nameRequired),
// 				price: yup.string().required(priceRequired),
// 			})
// 		),
// 		defaultValues: data,
// 	});

// 	return (
// 		<Modal
// 			title={title}
// 			onClose={onClose}
// 			className="md:max-w-md"
// 			actions={[
// 				{
// 					text: submitBtn,
// 					onClick: formMehtods.handleSubmit(formData => {
// 						onAdd(formData);
// 						onClose();
// 					}),
// 				},
// 				{
// 					color: 'outline-red',
// 					text: cancelBtn,
// 					onClick: onClose,
// 				},
// 				{
// 					color: 'red',
// 					text: removeBtn,
// 					className: `me-auto ${data.name ? '' : 'hidden'}`,
// 					onClick: () => {
// 						onRemove();
// 						onClose();
// 					},
// 				},
// 			]}
// 		>
// 			<FormProvider {...formMehtods}>
// 				<div className="grid xs:grid-cols-2 gap-6">
// 					<Input
// 						name="name"
// 						label={nameInput}
// 					/>
// 					<Input
// 						name="price"
// 						label={priceInput}
// 						type="currency"
// 					/>
// 				</div>
// 			</FormProvider>
// 		</Modal>
// 	);
// };

const calculateProductsCount = (products: [{ quantity: number }]) => {
	return products.reduce((acc, product) => +product.quantity + acc, 0);
};

const calculateProductsPrice = (products: [{ total: number }]) => {
	return numberToCurrency(products.reduce((acc, product) => +product.total + acc, 0));
};

const calculateTotalPrice = (products: [{ total: number }], shippingCost: number) => {
	return numberToCurrency([products.reduce((acc, product) => +product.total + acc, 0), shippingCost ? shippingCost : 0].reduce((a, p) => p + a, 0));
};

// OrderPayment.propTypes = {
// 	discountData: PropTypes.object,
// 	setDiscountData: PropTypes.func,
// };

// DiscountModal.propTypes = {
// 	data: PropTypes.object,
// 	onAdd: PropTypes.func,
// 	onClose: PropTypes.func,
// };

// ShippingDeliveryOption.propTypes = {
// 	data: PropTypes.object,
// 	onAdd: PropTypes.func,
// 	onClose: PropTypes.func,
// 	onRemove: PropTypes.func,
// };

// export default OrderPayment;
