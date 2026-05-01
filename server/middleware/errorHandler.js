const errorHandler = (err, _req, res, _next) => {
	console.error(err);

	const statusCode = err.statusCode || 500;
	const message = err.message || "Internal Server Error";

	if (err.message) {
		return res.status(statusCode).json({
			success: false,
			message,
		});
	}
};

export default errorHandler;
