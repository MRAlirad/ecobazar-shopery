export const numListArray = (num: number) => {
	return [...Array(num).keys()].map(i => i + 1);
};
