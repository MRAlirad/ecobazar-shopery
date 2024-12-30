import Header from './components/Header';
import Sidebar from './components/Sidebar';

function App() {
	return (
		<div className="grid grid-cols-[256px_1fr]">
			<Header />
			<Sidebar />

			<form>
				<div className="grid gap-6 mb-6 md:grid-cols-2">
					<div>
						<label
							htmlFor="first_name"
							className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
						>
							First name
						</label>
						<input
							type="text"
							id="first_name"
							className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							placeholder="John"
							required
						/>
					</div>
					<div>
						<label
							htmlFor="last_name"
							className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
						>
							Last name
						</label>
						<input
							type="text"
							id="last_name"
							className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							placeholder="Doe"
							required
						/>
					</div>
					<div>
						<label
							htmlFor="company"
							className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
						>
							Company
						</label>
						<input
							type="text"
							id="company"
							className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							placeholder="Flowbite"
							required
						/>
					</div>
					<div>
						<label
							htmlFor="phone"
							className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
						>
							Phone number
						</label>
						<input
							type="tel"
							id="phone"
							className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							placeholder="123-45-678"
							pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
							required
						/>
					</div>
					<div>
						<label
							htmlFor="website"
							className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
						>
							Website URL
						</label>
						<input
							type="url"
							id="website"
							className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							placeholder="flowbite.com"
							required
						/>
					</div>
					<div>
						<label
							htmlFor="visitors"
							className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
						>
							Unique visitors (per month)
						</label>
						<input
							type="number"
							id="visitors"
							className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							placeholder=""
							required
						/>
					</div>
				</div>
				<div className="mb-6">
					<label
						htmlFor="email"
						className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
					>
						Email address
					</label>
					<input
						type="email"
						id="email"
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						placeholder="john.doe@company.com"
						required
					/>
				</div>
				<div className="mb-6">
					<label
						htmlFor="password"
						className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
					>
						Password
					</label>
					<input
						type="password"
						id="password"
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						placeholder="•••••••••"
						required
					/>
				</div>
				<div className="mb-6">
					<label
						htmlFor="confirm_password"
						className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
					>
						Confirm password
					</label>
					<input
						type="password"
						id="confirm_password"
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						placeholder="•••••••••"
						required
					/>
				</div>
				<div className="flex items-start mb-6">
					<div className="flex items-center h-5">
						<input
							id="remember"
							type="checkbox"
							value=""
							className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
							required
						/>
					</div>
					<label
						htmlFor="remember"
						className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
					>
						I agree with the{' '}
						<a
							href="#"
							className="text-blue-600 hover:underline dark:text-blue-500"
						>
							terms and conditions
						</a>
						.
					</label>
				</div>
				<button
					type="submit"
					className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
				>
					Submit
				</button>
			</form>

			<button
				id="theme-toggle"
				type="button"
				className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5"
				onClick={() => {
					const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
					const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');

					// Change the icons inside the button based on previous settings
					if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
						themeToggleLightIcon?.classList.remove('hidden');
					} else {
						themeToggleDarkIcon?.classList.remove('hidden');
					}

					const themeToggleBtn = document.getElementById('theme-toggle');

					themeToggleBtn?.addEventListener('click', function () {
						// toggle icons inside button
						themeToggleDarkIcon?.classList.toggle('hidden');
						themeToggleLightIcon?.classList.toggle('hidden');

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
					});
				}}
			>
				<svg
					id="theme-toggle-dark-icon"
					className="hidden w-5 h-5"
					fill="currentColor"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
				</svg>
				<svg
					id="theme-toggle-light-icon"
					className="hidden w-5 h-5"
					fill="currentColor"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
						fill-rule="evenodd"
						clip-rule="evenodd"
					></path>
				</svg>
			</button>
		</div>
	);
}

export default App;
