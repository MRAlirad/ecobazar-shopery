import { ReactNode } from 'react';
import { useSearchParams } from 'react-router';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import classNames from 'classnames';
import { numListArray } from '../helpers/Array';

interface Props {
	currentPage : number;
	totalPages : number;
}

const Pagination = ({ currentPage, totalPages }: Props) => {
	console.log(totalPages);
	const [searchParams, setSearchParams] = useSearchParams();

	const changePage = (page: number) => {
		const params = {};

		for (const [key, value] of searchParams.entries()) {
			params[key] = value;
		}
		setSearchParams({ ...params, page });
	};
	return (
		<div className="flex items-center justify-center -space-x-px h-8 text-sm">
			<Button
				icon={<IoIosArrowBack />}
				className="rounded-s-lg"
				disabled={currentPage === 1}
				onClick={() => changePage(currentPage - 1)}
			/>
			{numListArray(totalPages).map(page => (
				<Button
					key={page}
					text={page}
					isActive={page === currentPage}
					onClick={() => changePage(page)}
				/>
			))}
			<Button
				icon={<IoIosArrowForward />}
				className="rounded-e-lg"
				disabled={currentPage === totalPages}
				onClick={() => changePage(currentPage + 1)}
			/>
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
				'flex items-center justify-center px-3 h-8 leading-tight border': true,
				'z-10 text-blue-600 border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white': isActive,
				'text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white':
					!isActive,
				'opacity-70': disabled,
				[className]: className,
			})}
			onClick={onClick}
			disabled={disabled}
		>
			{text ?? icon}
		</button>
	);
};

export default Pagination;
