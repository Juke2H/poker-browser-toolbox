import express from "express";
import { AppError } from "./errorClasses.mts";

const errorHandler = (error, request, response, next) => {
  // Log error
  console.error({
    timestamp: new Date().toISOString(),
    path: request.path,
    method: request.method,
    requestId: request.headers["x-request-id"],
    // If the error message is known, show message, otherwise show "Unknown error"
    error: error instanceof Error ? error.message : "Unknown error",
  });

  // Call default error handler if headers have already been sent (ie if there is an error during the response)
  if (response.headersSent) {
    return next(error);
  }

  // Custom error handling logic for AppError and later others maybe
  // Handle AppError
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message,
      ...(error.details && { details: error.details }),
      requestId: request.headers["x-request-id"],
    });
  }

  // Unknown error handling
  return response.status(500).json({
    status: "error",
    message: "An unexpected error occurred",
    requestId: request.headers["x-request-id"],
  });
};

export default errorHandler;
