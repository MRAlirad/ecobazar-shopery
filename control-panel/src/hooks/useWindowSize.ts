import { useState, useEffect } from 'react';

const useWindowSize = () => {
	const [windowSize, setWindowSize] = useState<{ width: number | undefined; height: number | undefined }>({
		width: undefined,
		height: undefined,
	});

	function handleResize() {
		setWindowSize({
			width: window.innerWidth,
			height: window.innerHeight,
		});
	}

	useEffect(() => {
		if (typeof window !== 'undefined') {
			window.addEventListener('resize', handleResize);
			handleResize();
			return () => window.removeEventListener('resize', handleResize);
		}
	}, []);

	return {
		windowSize,
		breakpoint: {
			sm: 640,
			md: 768,
			lg: 1024,
			xl: 1280,
			xxl: 1536,
		},
	};
};

export default useWindowSize;
