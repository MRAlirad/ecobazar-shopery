const apiConfig = {
	product: {
		queryKey: 'product',
		path: '/products',
	},
	category: {
		queryKey: 'category',
		path: '/categories',
	},
	customer: {
		queryKey: 'customer',
		path: '/customers',
	},
	order: {
		queryKey: 'order',
		path: '/orders',
	},
	user: {
		signup: {
			queryKey: 'user-signup',
			path: '/users/signup',
		},
		login: {
			queryKey: 'user-login',
			path: '/auth/login',
		},
		info: {
			queryKey: 'user-info',
			path: '/users/me',
		},
	},
};

export default apiConfig;
