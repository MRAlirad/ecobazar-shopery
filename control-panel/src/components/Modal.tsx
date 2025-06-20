import { useEffect, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import classNames from 'classnames';
import { useLockBodyScroll, useToggle } from 'react-use';
import Button from './Button';
import { Props as ButtonProps } from './Button';
import { IoClose } from 'react-icons/io5';

interface Props {
	title: string;
	children: ReactNode;
	onClose: () => void;
	className?: string;
	actions?: ButtonProps[];
}

const Modal = ({ title, children, actions = [], className = '', onClose = () => {} }: Props) => {
	const [locked, toggleLocked] = useToggle(false);
	useLockBodyScroll(locked);

	useEffect(() => {
		toggleLocked(true);
		return () => toggleLocked(false);
	}, [toggleLocked]);

	return createPortal(
		<div
			className="modal fixed inset-0 flex items-end md:items-center justify-center bg-black/60 z-[1000] backdrop-blur-sm"
			onClick={e => {
				if (e.target === e.currentTarget) onClose();
			}}
		>
			<div
				className={classNames({
					'grid overflow-hidden animate-fadeInUp': true,
					'w-full h-max max-h-[95vh] bg-white md:rounded-xl': true,
					'grid-rows-[max-content_1fr_max-content]': !!actions.length,
					'grid-rows-[max-content_1fr]': actions.length === 0,
					[className]: className,
				})}
			>
				<div className="flex items-center justify-between gap-2 py-4 px-6 border-b border-neutral-200 bg-neutral-100">
					<h3 className="text-base font-bold">{title}</h3>
					<Button color="simple" size="small" icon={<IoClose size={20} />} onClick={onClose} />
				</div>
				<div className="overflow-x-hidden overflow-y-auto p-4">{children}</div>
				{actions.length > 0 && (
					<div className="actions flex items-center flex-row-reverse flex-wrap gap-1.5 w-full py-5 px-6 border-t border-neutral-200 bg-neutral-50">
						{actions.map((action, index) => (
							<Button key={index} size="medium" {...action} />
						))}
					</div>
				)}
			</div>
		</div>,
		document.body
	);
};

export default Modal;
