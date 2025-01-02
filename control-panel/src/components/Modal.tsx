import { ReactNode } from 'react';
import classNames from 'classnames';
import Button from './Button';
import { Props as ButtonProps } from './Button';
import { IoCloseOutline } from 'react-icons/io5';

interface Props {
	title: string;
	children: ReactNode;
	onClose: () => void;
	className?: string;
	actions?: ButtonProps[];
}

const Modal = ({ title, children, className = '', actions = [], onClose = () => {} }: Props) => {
	return (
		<div
			className={classNames({
				'fixed inset-0 flex items-center justify-center bg-black/50 z-[1000] backdrop-blur-sm': true,
			})}
			onClick={e => {
				if (e.target === e.currentTarget) onClose();
			}}
		>
			<div
				className={classNames({
					'relative grid rounded-lg overflow-hidden w-full h-max max-w-[90vw] max-h-[90vh] bg-white shadow dark:bg-gray-700': true,
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
		</div>
	);
};

export default Modal;
