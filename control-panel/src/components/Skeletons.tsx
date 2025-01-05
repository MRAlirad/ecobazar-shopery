import { numListArray } from '../helpers/Array';

export const TableListSkeleton = () => {
	return (
		<div className="page">
			<div className="flex items-center justify-between">
				<div className="skeleton h-10 w-40"></div>
				<div className="skeleton h-8 w-32"></div>
			</div>
			<div className="table-wrapper">
				<table>
					<thead>
						<tr>
							{numListArray(6).map(th => (
								<th
									key={th}
									className={`px-[3%] ${th === 1 ? 'w-1/12' : ''}`}
								>
									<div className="skeleton h-2"></div>
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{numListArray(10).map(r => (
							<tr key={r}>
								{numListArray(6).map(r => (
									<td
										key={r}
										className="px-[3%]"
									>
										<div className="skeleton h-2"></div>
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export const FormSkeleton = () => {
	return (
		<div className="page">
			<div className="skeleton h-10 w-40"></div>
			<div className="grid grid-cols-[2fr_1fr] gap-y-6 gap-x-4">
				<div className="grid gap-y-4 h-max">
					<div className="card">
						<InputSkeleton />
						<InputSkeleton textarea />
					</div>
					<div className="card">
						<InputSkeleton />
						<InputSkeleton />
					</div>
				</div>
				<div className="grid gap-y-4 h-max">
					<div className="card">
						<InputSkeleton />
						<InputSkeleton />
					</div>
					<div className="card">
						<InputSkeleton />
						<InputSkeleton />
					</div>
				</div>
			</div>
		</div>
	);
};

export const InputSkeleton = ({ textarea = false, className = '' }: { textarea?: boolean; className?: string }) => {
	return (
		<div className={`grid gap-2 ${className}`}>
			<div className="skeleton h-3 w-16"></div>
			<div className={textarea ? 'skeleton h-48' : 'skeleton h-8'}></div>
		</div>
	);
};
