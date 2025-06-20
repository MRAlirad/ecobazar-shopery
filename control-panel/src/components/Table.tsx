import { ReactNode } from 'react';
import { Link, useSearchParams } from 'react-router';
import { generateRandomString } from '../helpers/String';
import Button, { Props as ButtonProps } from './Button';
import EmptyBox from './EmptyBox';
import Pagination from './Pagination';
import classNames from 'classnames';
import { TableBodySkeleton } from './Skeletons';
import { BsThreeDots } from 'react-icons/bs';
import Popup from './Popup';

const Table = ({ type = 'modal', columns = [], rows = [], pagination, isLoading = false, hasRowColumn = true }: TableProps) => {
	const [searchParams, setSearchParams] = useSearchParams();

	return (
		<div className="grid gap-6">
			<div className="table-container card">
				<div className="table-wrapper overflow-x-auto">
					<table className="w-full">
						<thead>
							<tr className="text-neutral-600 text-xs border-b">
								{hasRowColumn && <th className="w-[1%] bg-neutral-100 p-3 text-start sticky start-0">Row</th>}
								{columns.map(({ name, label, className = '' }) => (
									<th
										key={name}
										className={classNames({
											'bg-neutral-100 text-start px-6 py-3': true,
											'w-[1%] p-3 sticky end-0': name === 'action',
											[className]: className,
										})}
									>
										<div className="min-w-max">{label}</div>
									</th>
								))}
							</tr>
						</thead>
						{isLoading ? (
							<TableBodySkeleton count={columns.length + 1} />
						) : rows.length === 0 ? (
							<EmptySearchBox />
						) : (
							<tbody>
								{rows.map((row, index) => (
									<TableRow key={index} {...{ index, row, hasRowColumn }} />
								))}
							</tbody>
						)}
					</table>
				</div>
			</div>
			{pagination && pagination.totalPages > 1 && (
				<Pagination
					currentPage={pagination.currentPage}
					totalPages={pagination.totalPages}
					onChangePage={page => {
						if (type === 'modal' && pagination.onChangePage) pagination.onChangePage(page);
						else {
							const params: Record<string, string> = {};

							for (const [key, value] of searchParams.entries()) {
								params[key] = value;
							}
							setSearchParams({ ...params, page: page.toString() });
						}
					}}
				/>
			)}
		</div>
	);
};

const TableRow = ({ row = [], index, hasRowColumn = true }: TableRowProps) => {
	const uId = generateRandomString();

	return (
		<tr className="group relative text-xs font-bold hover:bg-neutral-50 border-b last:border-0 border-neutral-100 text-start">
			{hasRowColumn && <td className="p-3 bg-white sticky start-0 group-hover:bg-neutral-50">{index + 1}</td>}
			{row.map(({ name, value, component, link, className = '', actions, minWidthMax = true }) => (
				<td
					key={name}
					className={classNames({
						'px-6 py-3': true,
						'!p-2 bg-white sticky end-0 group-hover:bg-neutral-50 z-10': name === 'action',
						'absolute inset-0 !p-0': name === 'link',
						'absolute inset-0 bg-neutral-100/60': name === 'overlay',
						[className]: className,
					})}
				>
					<div
						className={classNames({
							'min-w-max': minWidthMax,
							'h-full': name === 'link',
						})}
					>
						{link && <Link className="block w-full h-full" to={link}></Link>}
						{actions && (
							<div className="flex items-center justify-center">
								<Button color="simple" size="small" className={`action-${uId} size-7 hover:bg-neutral-200`} icon={<BsThreeDots size={18} className="text-neutral-500" />} />
								<Popup anchorSelect={`.action-${uId}`} place="left" className="grid p-2 min-w-40 w-max">
									{actions.map(({ text, icon, className, loading = false, to, onClick }, index) => (
										<Button
											key={index}
											text={text}
											fluid
											size="small"
											color="simple"
											loading={loading}
											icon={icon}
											className={`!py-1.5 justify-start ${className}`}
											to={to}
											onClick={onClick}
										/>
									))}
								</Popup>
							</div>
						)}
						{value || component}
					</div>
				</td>
			))}
		</tr>
	);
};

const EmptySearchBox = () => {
	// const [, setSearchParams] = useSearchParams();

	return (
		<tbody>
			<tr>
				<td colSpan={15}>
					<EmptyBox
						text="Change filters"
						// action={{
						// 	text: 'Reset Filters',
						// 	onClick: () => {
						// 		setSearchParams({});
						// 	},
						// }}
					/>
				</td>
			</tr>
		</tbody>
	);
};

interface TableProps {
	type?: 'page' | 'modal';
	columns: {
		name: string;
		label: string;
		className?: string;
	}[];
	rows: RowProps[][];
	pagination?: {
		currentPage: number;
		totalPages: number;
		onChangePage?: (page: number) => void;
	};
	isLoading?: boolean;
	hasRowColumn?: boolean;
}

interface TableRowProps {
	row: RowProps[];
	index: number;
	hasRowColumn: boolean;
}

interface RowProps {
	name: string;
	value?: string | number;
	component?: ReactNode;
	link?: string;
	className?: string;
	actions?: ButtonProps[];
	minWidthMax?: boolean;
}

export default Table;
