import { Link } from 'react-router';
import Button from './Button';
import { MdLightMode, MdDarkMode } from 'react-icons/md';

const Header = () => {
	return (
		<header className="col-span-2 bg-white dark:bg-gray-900 sticky w-full z-20 top-0 border-b border-gray-200 dark:border-gray-600">
			<div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
				<Link
					to="/"
					className="flex items-center justify-center"
				>
					<img
						src="/pics/Logo.png"
						alt="logo"
					/>
				</Link>
				<Button
					color="default"
					text="theme mode"
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
			</div>
		</header>
	);
};

export default Header;
