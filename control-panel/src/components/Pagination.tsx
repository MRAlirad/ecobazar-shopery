import classNames from 'classnames';
import { ReactNode } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onChangePage: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onChangePage }: PaginationProps) => {
	return (
		<div className="flex items-center justify-center gap-1.5 h-10 text-base">
			<Button icon={<IoIosArrowBack size={20} />} className="rounded-s-lg" disabled={currentPage === 1} onClick={() => onChangePage(currentPage - 1)} />
			{currentPage !== 1 && <Button onClick={() => onChangePage(1)} text={1} />}
			{currentPage > 3 && <Button disabled icon={<BsThreeDots />} />}
			{currentPage >= 3 && <Button onClick={() => onChangePage(currentPage - 1)} text={currentPage - 1} />}
			<Button onClick={() => onChangePage(currentPage)} isActive={true} text={currentPage} />
			{currentPage + 2 <= totalPages && <Button onClick={() => onChangePage(currentPage + 1)} text={currentPage + 1} />}
			{currentPage + 3 <= totalPages && <Button disabled icon={<BsThreeDots />} />}
			{currentPage !== totalPages && <Button onClick={() => onChangePage(totalPages)} text={totalPages} />}
			<Button icon={<IoIosArrowForward size={20} />} className="rounded-e-lg" disabled={currentPage === totalPages} onClick={() => onChangePage(currentPage + 1)} />
		</div>
	);
};

interface ButtonProps {
	text?: number;
	icon?: ReactNode;
	isActive?: boolean;
	disabled?: boolean;
	className?: string;
	onClick?: () => void;
}

const Button = ({ text, icon, isActive = false, disabled = false, className = '', onClick = () => {} }: ButtonProps) => {
	return (
		<button
			className={classNames({
				'flex items-center justify-center size-8 border rounded': true,
				'text-white border-neutral-300 bg-neutral-700 hover:bg-neutral-900': isActive && !disabled,
				'text-neutral-500 bg-white border-neutral-300 hover:bg-neutral-100 hover:text-neutral-700': !isActive && !disabled,
				[className]: className,
				'opacity-70 text-neutral-500': disabled,
			})}
			onClick={onClick}
			disabled={disabled}
		>
			{text ?? icon}
		</button>
	);
};

export default Pagination;
