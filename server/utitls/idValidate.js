export const idValidate = (userId) => {
	const pattern = /^\d+$/;
	return pattern.test(userId);
};
