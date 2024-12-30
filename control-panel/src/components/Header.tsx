import LogoImg from '../../public/pics/Logo.png';
import { Link } from 'react-router';
import Button from './Button';

const Header = () => {
	return (
		<header className="col-span-2 bg-white dark:bg-gray-900 sticky w-full z-20 top-0 border-b border-gray-200 dark:border-gray-600">
			<div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
				<Link
					to="/"
					className="flex items-center justify-center"
				>
					<img
						src={LogoImg}
						alt="logo"
					/>
				</Link>
				<Button color='red' text='log out' />
			</div>
		</header>
	);
};

export default Header;
