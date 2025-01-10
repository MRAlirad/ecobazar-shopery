import RadiantBg from '../../components/user/RadiantBg';
import { Outlet } from 'react-router';
const Auth = () => {
	return (
		<div className="log-in-page flex items-center justify-center min-h-screen w-full">
			<RadiantBg />
			<Outlet />
		</div>
	);
};

export default Auth;
