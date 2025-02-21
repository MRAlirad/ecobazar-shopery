import { useState } from 'react';
import { ReactNode } from 'react';
import { Link } from 'react-router';
import Icon from './Icon';
import { RiDashboardFill } from 'react-icons/ri';
import { FaCartShopping } from 'react-icons/fa6';
import { IoIosArrowDown } from 'react-icons/io';
import { BiSolidCategoryAlt } from 'react-icons/bi';

interface SidebarItemProps {
	icon: ReactNode;
	label: string;
	href: string;
	submenu?: { label: string; href: string }[];
}

const Sidebar = () => {
	const sidebarItems: SidebarItemProps[] = [
		{
			href: '/dashboard',
			label: 'Dashboard',
			icon: <RiDashboardFill />,
		},
		{
			href: '/product',
			label: 'Product',
			icon: <FaCartShopping />,
			submenu: [
				{
					href: '/product/list',
					label: 'Product List',
				},
				{
					href: '/product/add',
					label: 'Add Product',
				},
			],
		},
		{
			href: '/category',
			label: 'Category',
			icon: <BiSolidCategoryAlt />,
			submenu: [
				{
					href: '/category/list',
					label: 'Categry List',
				},
				{
					href: '/category/add',
					label: 'Add Categry',
				},
			],
		},
	];

	return (
		<aside className="sticky top-20 h-[calc(100vh-80px)]">
			<div className="h-full px-3 py-4 overflow-y-auto border-e-2 border-gray-200 dark:border-white/20">
				<ul className="space-y-2 font-medium">
					{sidebarItems.map((item, index) => (
						<SidearItem
							key={index}
							{...item}
						/>
					))}
				</ul>
			</div>
		</aside>
	);
};

const SidearItem = ({ label, href, icon, submenu }: SidebarItemProps) => {
	const [isOpen, setisOpen] = useState(false);

	const Tag = submenu ? 'button' : Link;
	return (
		<li>
			<Tag
				to={href}
				className="flex items-center gap-3 w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
				onClick={() => setisOpen(prev => !prev)}
			>
				<Icon>{icon}</Icon>
				<span className="me-auto">{label}</span>
				{submenu && (
					<Icon size="16">
						<IoIosArrowDown />
					</Icon>
				)}
			</Tag>
			{isOpen && submenu && (
				<ul className="py-2 space-y-2">
					{submenu.map((item, index) => (
						<li key={index}>
							<Link
								to={item.href}
								className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
							>
								{item.label}
							</Link>
						</li>
					))}
				</ul>
			)}
		</li>
	);
};

export default Sidebar;
