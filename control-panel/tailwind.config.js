/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	darkMode: 'class',
	theme: {
		extend: {
			keyframes: {
				progress: {
					'0%': {
						transform: 'translate3d(-100%, 0, 0)',
					},
					'100%': {
						transform: 'translate3d(100%, 0, 0)',
					},
				},
			},
			animation: {
				progress: 'progress 1s ease-in-out infinite',
			},
		},
	},
	plugins: [],
};
