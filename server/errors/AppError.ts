class AppError extends Error {
	statusCode: number; // Error class done have statusCode, so need to explicitly declare it here.

	constructor(message: string, statusCode: number) {
		super(message);
		this.statusCode = statusCode;
		this.name = "AppError";
	}
}

export default AppError;
