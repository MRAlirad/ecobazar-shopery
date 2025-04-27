import { Link } from 'react-router';
import Button from './Button';
import Icon from './Icon';
import Popup from './Popup';
import { useGetUserInfo } from '../hooks/api';
import { FaUserLarge } from 'react-icons/fa6';
import { EcobazarShoperyToken } from '../helpers/Token';

const Header = () => {
	const { data: user, isLoading: isUserLoading, error: userError } = useGetUserInfo();

	return (
		<header className="col-span-2 bg-white shadow sticky top-0 z-30">
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
				<div className="flex items-center gap-4">
					{isUserLoading ? (
						<div className="skeleton w-10 h-10 rounded-full"></div>
					) : userError ? (
						<Button
							text="Log In"
							to="/auth/login"
						/>
					) : (
						<>
							<div className="avatar img-box w-10 h-10 p-1 rounded-full ring-2 ring-gray-300 cursor-pointer">
								<Icon
									size="20"
									color="text-gray-700"
								>
									<FaUserLarge />
								</Icon>
							</div>
							<Popup
								anchorSelect=".avatar"
								className="p-4 text-sm text-gray-900 flex flex-col gap-3"
							>
								<span>{user?.name}</span>
								<span className="font-medium truncate">{user?.email}</span>
								<Button
									text="Log out"
									color="red"
									fluid
									onClick={() => {
										EcobazarShoperyToken('delete');
										location.reload();
									}}
								/>
							</Popup>
						</>
					)}
				</div>
			</div>
		</header>
	);
};

export default Header;
