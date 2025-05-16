export const generateRandomString = (length = 10, characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789') => {
	let result = '';
	const charactersLength = characters.length;
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
};

export const stringToHandler = (string: string): string => {
	return string.replaceAll(' ', '-');
};

export const handlerToString = (handler: string): string => {
	return handler.replaceAll('-', ' ');
};
