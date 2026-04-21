class AppError extends Error {
	constructor(message, statusCode) {
		super(message);
		this.statuscode = statusCode;
		this.name = "AppError";
	}
}

export default AppError;
