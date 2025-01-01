import Header from './components/Header';
import Sidebar from './components/Sidebar';

function App() {
	return (
		<div className="grid grid-cols-[256px_1fr] grid-rows-[max-content_1fr] bg-white dark:bg-gray-900 min-h-screen">
			<Header />
			<Sidebar />
		</div>
	);
}

export default App;
