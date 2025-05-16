import { Fragment, ReactNode } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router';
import { HiHome } from 'react-icons/hi';
import { IoIosArrowForward } from 'react-icons/io';
import { IoSettingsSharp } from 'react-icons/io5';

interface Props {
	type?: 'home' | 'setting';
	breadcrumb: {
		label: string;
		icon?: ReactNode;
		link?: string;
	}[];
}

const Breadcrumb = ({ type = 'home', breadcrumb = [] }: Props) => {
	return (
		<div className="flex items-center flex-wrap gap-1.5 text-gray-600">
			{type === 'home' && (
				<Link
					to="/"
					className="flex items-center gap-1 text-sm font-medium hover:text-gray-800"
				>
					<HiHome />
					<span>Home</span>
				</Link>
			)}
			{type === 'setting' && (
				<Link
					to="/settings"
					className="flex items-center gap-1 text-sm font-medium hover:text-gray-800"
				>
					<IoSettingsSharp />
					<span>Settings</span>
				</Link>
			)}
			<IoIosArrowForward size={14} />
			{breadcrumb.map(({ label, icon, link }, index) => (
				<Fragment key={index}>
					<Link
						to={link ?? ''}
						className={classNames({
							'flex items-center gap-1 text-sm font-medium hover:text-gray-800': true,
							'text-gray-900': breadcrumb.length - 1 === index,
						})}
					>
						{icon && icon}
						<span>{label}</span>
					</Link>
					{breadcrumb.length - 1 !== index && <IoIosArrowForward size={14} />}
				</Fragment>
			))}
		</div>
	);
};

export default Breadcrumb;
