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

  // Handling logic for custom thrown AppErrors
  // ???check typing
  if (error instanceof AppError) {
    const errorResponse: {
      status: string;
      // code: string;
      message: string;
      details?: Record<string, any>;
      requestId: string | string[] | undefined;
    } = {
      status: "error",
      // code: error.code,
      message: error.message,
      details: error.details,
      requestId: request.headers["x-request-id"],
    };

    return response.status(error.statusCode).json(errorResponse);
  }

  // Handle other known errors
  if (error instanceof Error) {
    // Determine status code based on error type
    let statusCode = 500;
    // If error.name is TypeError, then 400
    // If error.name is ReferenceError, then 500
    // if error.name is SyntaxError, then 400
    // Could probably stack the ifs

    //return response.status(statuscode).json({ status: //, message: //, request.headers["x-request-id"] })
  }
};

export default errorHandler;
