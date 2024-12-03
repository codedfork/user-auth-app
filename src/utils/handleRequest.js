const logger = require('./logger');

// Enhanced request handler with custom messages
const handleRequest = async (req, res, callback, successMessage) => {
  try {
    const data = await callback(req); // Execute the provided callback with request data
    res.status(200).json({
      success: true,
      message: successMessage || 'Request successful', // Custom success message
      data,
    });
  } catch (error) {
    console.log(error)
    logger.error('Request Error:', { error: error, route: req.originalUrl });

    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Internal Server Error',
    });
  }
};

module.exports = handleRequest;
