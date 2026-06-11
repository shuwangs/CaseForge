import type { NextFunction, Request, Response } from "express";
import AppError from "../errors/AppError.ts";

const errorHandler = (
	err: unknown,
	_req: Request,
	res: Response,
	_next: NextFunction,
) => {
	const statusCode = err instanceof AppError ? err.statusCode : 500;

	const message =
		err instanceof AppError ? err.message : "Internal Server Error";

	return res.status(statusCode).json({ success: false, message });
};

export default errorHandler;
