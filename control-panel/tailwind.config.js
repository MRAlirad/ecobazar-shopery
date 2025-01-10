/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	darkMode: 'class',
	theme: {
		extend: {
			keyframes: {
				fadeInUp: {
					'0%': {
						opacity: '0',
						transform: 'translate3d(0, 20%, 0)',
					},
					'100%': {
						opacity: '1',
						transform: 'translateZ(0)',
					},
				},
				progress: {
					'0%': {
						transform: 'translate3d(100%, 0, 0)',
					},
					'100%': {
						transform: 'translate3d(-100%, 0, 0)',
					},
				},
				gradientShape1: {
					'0%': {
						transform: 'translate(-30%, 40%) rotate(-20deg)',
					},
					'25%': {
						transform: 'translate(0%, 20%) skew(-15deg, -15deg) rotate(80deg)',
					},
					'50%': {
						transform: 'translate(30%, -10%) rotate(180deg)',
					},
					'75%': {
						transform: 'translate(-30%, 40%) skew(15deg, 15deg) rotate(240deg)',
					},
					'100%': {
						transform: 'translate(-30%, 40%) rotate(-20deg)',
					},
				},
				gradientShape2: {
					'0%': {
						transform: 'translate(20%, -40%) rotate(-20deg)',
					},
					'20%': {
						transform: 'translate(0%, 0%) skew(-15deg, -15deg) rotate(80deg)',
					},
					'40%': {
						transform: 'translate(-40%, 50%) rotate(180deg)',
					},
					'60%': {
						transform: 'translate(-20%, -20%) skew(15deg, 15deg) rotate(80deg)',
					},
					'80%': {
						transform: 'translate(10%, -30%) rotate(180deg)',
					},
					'100%': {
						transform: 'translate(20%, -40%) rotate(340deg)',
					},
				},
			},
			animation: {
				fadeInUp: 'fadeInUp 0.3s forwards',
				progress: 'progress 1s ease-in-out infinite',
				gradientShape1: 'gradientShape1 20s cubic-bezier(0.1, 0, 0.9, 1) infinite',
				gradientShape2: 'gradientShape2 20s cubic-bezier(0.1, 0, 0.9, 1) infinite',
			},
		},
	},
	plugins: [],
};
