export const EcobazarShoperyToken = (type: 'get' | 'delete' | 'set' = 'get', token: string = '') => {
	if (type === 'get') return localStorage.getItem('ecobazar-shopery-token');
	if (type === 'delete') {
		localStorage.removeItem('ecobazar-shopery-token');
		return;
	}
	if (type === 'set') {
		localStorage.setItem('ecobazar-shopery-token', token);
		return;
	}
};
