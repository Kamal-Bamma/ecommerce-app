import validator from "validator";
import bcrypt from "bcrypt"; // Fixed typo: "bycrpt" to "bcrypt"
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js"; // Ensure the path includes ".js"

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

// Route for user login
const loginUser = async (req, res) => {
  // Implement login functionality
};

// Router for user register
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Checking if user already exists
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists." });
    }

    // Validating email format & strong password
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter a valid email" });
    }
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password should be at least 8 characters",
      });
    }

    // Hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create and save user
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();

    // Generate token
    const token = createToken(user._id);

    // Respond to client
    res.status(201).json({
      success: true,
      token,
      message: "User registered successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

// Router for admin login
const adminLogin = async (req, res) => {
  // Implement admin login functionality
};

export { loginUser, registerUser, adminLogin };
