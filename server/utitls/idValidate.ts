export const idValidate = (userId: string): boolean => {
	const pattern = /^\d+$/;
	return pattern.test(userId);
};
