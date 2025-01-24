export const SearchParamsToObject = () => {
	const search = window.location.search.substring(1); //? removes the "?" from url searchParams

	return JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');
};

// export const Pick = (object: object, valueArray: string[]) => {
// 	return valueArray.reduce((obj, key) => {
// 		if (object && Object.hasOwnProperty.call(object, key)) {
// 			obj[key] = object[key];
// 		}
// 		return obj;
// 	}, {});
// };

export const Pick = (object: object, valueArray: string[]) => {
	return valueArray.reduce((obj: { [key: string]: unknown }, key) => {
		if (object && Object.hasOwnProperty.call(object, key)) {
			obj[key] = (object as { [key: string]: unknown })[key];
		}
		return obj;
	}, {});
};