import Header from './components/Header';
import Sidebar from './components/Sidebar';
import { Outlet, useLocation } from 'react-router';
import { ToastContainer } from 'react-toastify';
import classNames from 'classnames';

function App() {
	const { pathname } = useLocation();
	return (
		<div
			className={classNames({
				'min-h-screen': true,
				'grid grid-cols-[256px_1fr] grid-rows-[64px_1fr] bg-gray-100': !pathname.includes('auth'),
			})}
		>
			{!pathname.includes('auth') && (
				<>
					<Header />
					<Sidebar />
				</>
			)}
			<Outlet />
			<ToastContainer position="bottom-center" closeOnClick theme="colored" />
		</div>
	);
}

export default App;
