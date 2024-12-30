import Sidebar from './components/Sidebar';

function App() {
	return (
		<div className="grid grid-cols-[256px_1fr]">
			<header className="col-span-2"></header>
			<Sidebar />
		</div>
	);
}

export default App;
