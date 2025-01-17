import { Link } from 'react-router';
import Button from './Button';
import { MdLightMode, MdDarkMode } from 'react-icons/md';
import { useGetUserInfo } from '../hooks/api';

const Header = () => {
	const { data, isLoading, error } = useGetUserInfo();

	return (
		<header className="col-span-2 bg-white dark:bg-gray-900 sticky w-full h-20 z-20 top-0 border-b border-gray-200 dark:border-gray-600">
			<div className="max-desktop-width flex items-center justify-between h-full">
				<Link
					to="/"
					className="flex items-center justify-center"
				>
					<img
						src="/pics/Logo.png"
						alt="logo"
					/>
				</Link>
				<div className='flex items-center gap-4'>
					<Button
						color="default"
						size="icon"
						icon={
							<>
								<MdDarkMode className="hidden dark:block" />
								<MdLightMode className="block dark:hidden" />
							</>
						}
						onClick={() => {
							// if set via local storage previously
							if (localStorage.getItem('color-theme')) {
								if (localStorage.getItem('color-theme') === 'light') {
									document.documentElement.classList.add('dark');
									localStorage.setItem('color-theme', 'dark');
								} else {
									document.documentElement.classList.remove('dark');
									localStorage.setItem('color-theme', 'light');
								}
								// if NOT set via local storage previously
							} else {
								if (document.documentElement.classList.contains('dark')) {
									document.documentElement.classList.remove('dark');
									localStorage.setItem('color-theme', 'light');
								} else {
									document.documentElement.classList.add('dark');
									localStorage.setItem('color-theme', 'dark');
								}
							}
						}}
					/>
					{isLoading ? (
						<div className="skeleton w-10 h-10 rounded-full"></div>
					) : error ? (
						<Button text='Log In' to="/auth/login" />
					) : (
						<span>{data?.email}</span>
					)}
					<div></div>
				</div>
			</div>
		</header>
	);
};

export default Header;
