import Card from './Card';
import { numListArray } from '../helpers/Array';

export const ListSkeleton = () => {
	return (
		<div className="grid gap-4 px-4 md:px-[2%] h-max py-3">
			<BreadcrumbSkeleton />
			<div className="skeleton h-5 w-32"></div>
			<TableSkeleton />
		</div>
	);
};

export const FormSkeleton = ({ columns = 2 }) => {
	return (
		<div className="grid gap-4 px-4 md:px-[2%] xl:px-[14.5%] pt-4 pb-8 h-max">
			<BreadcrumbSkeleton />
			<div className="flex items-center gap-2">
				<div className="skeleton size-5"></div>
				<div className="skeleton h-5 w-32"></div>
			</div>
			<div className={`grid ${columns === 2 && 'md:grid-cols-[2fr_1fr]'} gap-y-6 gap-x-4`}>
				<div className="grid gap-y-4 h-max">
					<Card>
						<InputSkeleton />
						<InputSkeleton textarea />
					</Card>
					<Card>
						<InputSkeleton />
						<InputSkeleton />
					</Card>
				</div>
				<div className="grid gap-y-4 h-max">
					<Card>
						<InputSkeleton />
						<InputSkeleton />
					</Card>
					<Card>
						<InputSkeleton />
						<InputSkeleton />
					</Card>
				</div>
			</div>
			<div className="flex items-center gap-2 flex-row-reverse">
				<div className="skeleton h-10 w-24"></div>
				<div className="skeleton h-10 w-24"></div>
			</div>
		</div>
	);
};

export const TableSkeleton = ({ count = 7 }) => {
	return (
		<>
			<div className="card">
				<div className="action-box flex items-center justify-between h-10 px-4">
					<div className="flex items-center gap-1.5">
						<div className="skeleton w-10 h-5"></div>
						<div className="skeleton w-10 h-5"></div>
					</div>
					<div className="flex items-center gap-1.5">
						<div className="skeleton w-10 h-5"></div>
						<div className="skeleton w-10 h-5"></div>
					</div>
				</div>
				<div className="table-wrapper overflow-x-auto">
					<table className="w-full">
						<thead>
							<tr className="border-b bg-gray-100">
								{numListArray(count).map(c => (
									<th
										key={c}
										className="p-3"
									>
										<div className="skeleton h-3"></div>
									</th>
								))}
							</tr>
						</thead>
						<TableBodySkeleton count={count} />
					</table>
				</div>
			</div>
			<PaginationSkeleton />
		</>
	);
};

export const TableBodySkeleton = ({ count = 7 }) => {
	return (
		<tbody>
			{numListArray(count).map(r => (
				<tr
					key={r}
					className="border-b last:border-0 border-gray-100"
				>
					{numListArray(count).map(r => (
						<td
							key={r}
							className="p-3"
						>
							<div className="skeleton h-3"></div>
						</td>
					))}
				</tr>
			))}
		</tbody>
	);
};

export const BreadcrumbSkeleton = () => {
	return (
		<div className="flex items-center gap-1.5">
			<div className="skeleton w-16 h-4"></div>
			<div className="skeleton size-4"></div>
			<div className="skeleton w-16 h-4"></div>
			<div className="skeleton size-4"></div>
			<div className="skeleton w-16 h-4"></div>
		</div>
	);
};

export const PaginationSkeleton = () => {
	return (
		<div className="flex items-ceter gap-1 justify-self-center">
			{numListArray(6).map(n => (
				<div
					key={n}
					className="skeleton size-6"
				></div>
			))}
		</div>
	);
};

export const InputSkeleton = ({ textarea = false, className = '' }) => {
	return (
		<div className={`grid gap-2 ${className}`}>
			<div className="skeleton h-3 w-16"></div>
			<div className={textarea ? 'skeleton h-48' : 'skeleton h-8'}></div>
		</div>
	);
};
