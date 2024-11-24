
const sendErrorResponse = (res, message = "An unexpected error occurred", statusCode = 500, error = null) => {
    const response = {
      status: 'error',
      statusCode,
      message,
    };
  
    // Include additional error details if provided
    if (error) {
      response.error = {
        message: error.message || null,
      };
    }
    res.status(statusCode).json(response);
  };
  
  const sendSuccessResponse = (res, message = 'Success', statusCode = 200, data = {},) => {
    res.status(statusCode).json({
      status: 'success',
      statusCode,
      message,
      data,
    });
  };
  
  module.exports = {
    sendErrorResponse,
    sendSuccessResponse,
  };
  