let orderIdCounter = 0;

export const generateCodePayment = () => {
	const timestamp = Date.now().toString(36).toUpperCase();
	const randomString = Math.random().toString(36).substr(2, 9).toUpperCase();
	return `${timestamp}${randomString}${orderIdCounter++}`;
};
