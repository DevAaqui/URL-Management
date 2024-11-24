const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const { sendErrorResponse } = require('../utils/responseHandler');

const createUserController = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return sendErrorResponse(res, "Username, email, and password are required!", 400);
  }

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return sendErrorResponse(res, "Email is already in use!", 400);
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User created successfully!",
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return sendErrorResponse(res, "An error occurred while creating the user.", 500, error);
  }
};

const loginController = async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return sendErrorResponse(res, "Email and password are required!", 400);
  }

  try {
    // Find user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return sendErrorResponse(res, "Invalid email or password!", 401);
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return sendErrorResponse(res, "Invalid email or password!", 401);
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user.id, username: user.username }, 
      process.env.TOKEN_SECRET, 
      { expiresIn: '1h' } // Token expires in 1 hour
    );

    // Respond with token
    res.status(200).json({
      message: "Login successful!",
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    return sendErrorResponse(res, "An error occurred during login!", 500, error);
  }
};

module.exports = { loginController, createUserController };
