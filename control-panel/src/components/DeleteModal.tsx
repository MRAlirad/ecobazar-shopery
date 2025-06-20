import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useLockBodyScroll, useToggle } from 'react-use';
import Button from './Button';
import Icon from './Icon';
import { PiWarningCircle } from 'react-icons/pi';
import { IoClose } from 'react-icons/io5';

interface Props {
	title: string;
	onClose: () => void;
	onDelete: () => void;
	isDeleting: boolean;
}

const DeleteModal = ({ title, onClose, onDelete, isDeleting }: Props) => {
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
			<div className="relative bg-white p-4 w-full h-max max-w-md max-h-full rounded-lg overflow-hidden shadow">
				<Button color="simple" size="icon" icon={<IoClose />} onClick={onClose} className="absolute top-4 end-4" />
				<div className="flex flex-col items-center gap-4 p-5 text-center">
					<Icon size="80" className="text-neutral-400">
						<PiWarningCircle />
					</Icon>
					<h3 className="text-xl font-normal text-neutral-700">{title}</h3>
					<p className="text-neutral-500">this process can not be undone!</p>
					<div className="flex items-center justify-center gap-4">
						<Button color="red-outline" text="No, Cancel" onClick={onClose} />
						<Button color="red" text="Yes, I'm sure" onClick={onDelete} loading={isDeleting} />
					</div>
				</div>
			</div>
		</div>,
		document.body
	);
};

export default DeleteModal;
