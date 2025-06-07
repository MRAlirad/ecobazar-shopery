import { ReactNode } from 'react';
import classNames from 'classnames';
import { NavLink } from 'react-router';
import Icon from '../components/Icon';
import { HiHome } from 'react-icons/hi';
import { FaShoppingCart } from 'react-icons/fa';
import { BiSolidCategoryAlt } from 'react-icons/bi';
import { FaUser } from "react-icons/fa6";

const Sidebar = () => {
	const links = [
		{
			label: 'Dashboard',
			icon: <HiHome />,
			href: '/',
		},
		{
			label: 'Products',
			icon: <FaShoppingCart />,
			href: '/product',
		},
		{
			label: 'Categories',
			icon: <BiSolidCategoryAlt />,
			href: '/category',
		},
		{
			label: 'Customers',
			icon: <FaUser />,
			href: '/customer',
		},
	];

	return (
		<aside className="sticky top-16 grid gap-4 w-full h-[calc(100vh-64px)] bg-gray-100 shadow-xl overflow-x-hidden overflow-y-auto py-4 border-e border-gray-300">
			<div className="flex flex-col">
				{links.map(({ label, icon, href }, index) => (
					<LinkItem
						key={index}
						{...{ label, icon, href }}
					/>
				))}
			</div>
		</aside>
	);
};

interface LinkItemProps {
	label: string;
	href: string;
	icon: ReactNode;
}

const LinkItem = ({ label, href, icon }: LinkItemProps) => {
	return (
		<div>
			<NavLink
				key={label}
				to={href}
				className={({ isActive }) =>
					classNames({
						'relative grid grid-cols-[max-content_1fr_max-content] items-center gap-2 text-sm py-2 px-4 duration-200': true,
						'bg-gray-200 border-s-4 border-green-700': isActive,
					})
				}
			>
				{({ isActive }) => (
					<>
						<Icon
							size="18"
							className={isActive ? 'text-green-700' : 'text-gray-600'}
						>
							{icon}
						</Icon>
						<span className={isActive ? 'text-green-700' : 'text-gray-700'}>{label}</span>
					</>
				)}
			</NavLink>
		</div>
	);
};

export default Sidebar;
