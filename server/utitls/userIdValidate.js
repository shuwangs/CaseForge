export const userIdValidate = (userId) => {
	const pattern = /^\d+$/;
	return pattern.test(userId);
};
