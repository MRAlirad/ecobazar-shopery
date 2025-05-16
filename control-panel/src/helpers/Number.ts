export const currencyToNumber = (price: string): number => {
	return +price.split(',').join('');
};

export const numberToCurrency = (number: number) => {
	return number.toLocaleString();
};

export const persianToEnglishDigits = (number: string) => {
	const id: Record<string, string> = { '۰': '0', '۱': '1', '۲': '2', '۳': '3', '۴': '4', '۵': '5', '۶': '6', '۷': '7', '۸': '8', '۹': '9' };
	return number.replace(/[^0-9.]/g, function (w) {
		return id[w] || w;
	});
};

export const englishToPersianDigit = (number: string) => {
	const id = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
	return String(number).replace(/[0-9]/g, function (w) {
		return id[+w];
	});
};
