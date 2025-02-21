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
				'grid grid-cols-[256px_1fr] grid-rows-[max-content_1fr] bg-white dark:bg-[#0e1624]': !pathname.includes('auth'),
			})}
		>
			{!pathname.includes('auth') && (
				<>
					<Header />
					<Sidebar />
				</>
			)}
			<Outlet />
			<ToastContainer
				position="bottom-center"
				theme="colored"
			/>
		</div>
	);
}

export default App;
