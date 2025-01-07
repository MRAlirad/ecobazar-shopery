import { useEffect, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import classNames from 'classnames';
import { useLockBodyScroll, useToggle } from 'react-use';
import Button from './Button';
import Icon from './Icon';
import { Props as ButtonProps } from './Button';
import { IoCloseOutline } from 'react-icons/io5';
import { PiWarningCircle } from 'react-icons/pi';

interface Props {
	title: string;
	children: ReactNode;
	onClose: () => void;
	className?: string;
	actions?: ButtonProps[];
}

const Modal = ({ title, children, className = '', actions = [], onClose = () => {} }: Props) => {
	const [locked, toggleLocked] = useToggle(false);
	useLockBodyScroll(locked);

	useEffect(() => {
		toggleLocked();
		return () => toggleLocked();
	}, [toggleLocked]);

	return createPortal(
		<div
			className="fixed inset-0 flex items-center justify-center bg-black/50 z-[1000] backdrop-blur-sm"
			onClick={e => {
				if (e.target === e.currentTarget) onClose();
			}}
		>
			<div
				className={classNames({
					'relative grid rounded-lg overflow-hidden w-full h-max max-w-[90vw] max-h-[90vh] bg-white shadow dark:bg-gray-800': true,
					'grid-rows-[max-content_1fr_max-content]': !!actions.length,
					'grid-rows-[max-content_1fr]': actions.length === 0,
					[className]: className,
				})}
			>
				<div className="flex items-center justify-between p-4 border-b dark:border-gray-600">
					<h3 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h3>
					<Button
						color="default"
						size="icon"
						icon={<IoCloseOutline />}
						onClick={onClose}
					/>
				</div>
				<div className="overflow-y-auto overflow-x-hidden p-4">{children}</div>
				<div className="flex flex-row-reverse items-center gap-4 p-4 border-t border-gray-200 dark:border-gray-600">
					{actions.map((btn, index) => (
						<Button
							key={index}
							{...btn}
						/>
					))}
				</div>
			</div>
		</div>,
		document.body
	);
};

interface DeleteModalProps {
	title: string;
	onClose: () => void;
	onDelete: () => void;
	isDeleting: boolean;
}

export const DeleteModal = ({ title, onClose, onDelete, isDeleting }: DeleteModalProps) => {
	const [locked, toggleLocked] = useToggle(false);
	useLockBodyScroll(locked);

	useEffect(() => {
		toggleLocked();
		return () => toggleLocked();
	}, [toggleLocked]);

	return createPortal(
		<div
			className="fixed inset-0 flex items-center justify-center bg-black/50 z-[1000] backdrop-blur-sm"
			onClick={e => {
				if (e.target === e.currentTarget) onClose();
			}}
		>
			<div className="relative bg-white dark:bg-gray-800 p-4 w-full h-max max-w-md max-h-full rounded-lg overflow-hidden shadow">
				<Button
					color="default"
					size="icon"
					icon={<IoCloseOutline />}
					onClick={onClose}
					className='absolute top-4 start-4'
				/>
				<div className="flex flex-col items-center gap-4 p-5 text-center">
					<Icon
						size="80"
						className="text-gray-400 dark:text-gray-200"
					>
						<PiWarningCircle />
					</Icon>
					<h3 className="text-xl font-normal text-gray-700 dark:text-gray-400">{title}</h3>
					<p className="text-gray-500 dark:text-gray-400">this process can not be undone!</p>
					<div className="flex items-center justify-center gap-4">
						<Button
							color="red"
							text="Yes, I'm sure"
							onClick={onDelete}
							loading={isDeleting}
						/>
						<Button
							color="default"
							text="No, Cancel"
							onClick={onClose}
						/>
					</div>
				</div>
			</div>
		</div>,
		document.body
	);
};

export default Modal;
