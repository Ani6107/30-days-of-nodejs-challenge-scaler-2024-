function errorHandler(err, req, res, next) {
    // Log the error for debugging purposes
    console.error(err);

    // Check if the error has a status code, otherwise default to 500 (Internal Server Error)
    const statusCode = err.statusCode || 500;

    // Send an appropriate error response to the client
    res.status(statusCode).json({
        error: {
            message: err.message || 'Internal Server Error',
            status: statusCode,
        },
    });
}

module.exports = errorHandler;
