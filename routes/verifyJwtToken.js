const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Import the User model
const { sendErrorResponse } = require('../utils/responseHandler');

function verifiedFunction() {
  return async (req, res, next) => {
    // Extract the token from the Authorization header
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
      return sendErrorResponse(res, "You are not authorized to perform this operation!", 401);
    }

    try {
      // Verify the token using the secret
      const verified = jwt.verify(token, process.env.TOKEN_SECRET);

      // Find the user in the database
      const userData = await User.findOne({ where: { id: verified.id } });
      if (!userData) {
        return sendErrorResponse(res, "User not found. You are not authorized to perform this operation!", 401);
      }

      // Attach user data to the request object for further use
      req.user = userData;

      return next();
    } catch (error) {
      return sendErrorResponse(res, "Invalid token!", 401, error);
    }
  };
}

module.exports = { verifiedFunction };
