const jwt = require("jsonwebtoken");
const env = require("../config/env");
const Student = require("../models/Student");
const asyncHandler = require("../utils/asyncHandler");
const HttpError = require("../utils/httpError");

function generateToken(user) {
  return jwt.sign(
    { sub: user._id, role: user.role },
    env.jwtSecret,
    { expiresIn: env.jwtExpiresIn }
  );
}

const register = asyncHandler(async (req, res) => {
  const { email, password, fullName, role, targetCountries, interestedFields, preferredIntake, maxBudgetUsd } = req.body;

  if (!email || !password || !fullName) {
    throw new HttpError(400, "Please provide full name, email, and password.");
  }

  const existingUser = await Student.findOne({ email: email.toLowerCase() });
  if (existingUser) {
    throw new HttpError(409, "User with this email already exists.");
  }

  const student = await Student.create({
    email,
    password,
    fullName,
    role,
    targetCountries,
    interestedFields,
    preferredIntake,
    maxBudgetUsd,
  });

  const token = generateToken(student);

  res.status(201).json({
    success: true,
    data: {
      token,
      user: {
        id: student._id,
        email: student.email,
        fullName: student.fullName,
        role: student.role,
      },
    },
  });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new HttpError(400, "Please provide email and password.");
  }

  const student = await Student.findOne({ email: email.toLowerCase() });
  if (!student) {
    throw new HttpError(401, "Invalid email or password.");
  }

  const isMatch = await student.comparePassword(password);
  if (!isMatch) {
    throw new HttpError(401, "Invalid email or password.");
  }

  const token = generateToken(student);

  res.json({
    success: true,
    data: {
      token,
      user: {
        id: student._id,
        email: student.email,
        fullName: student.fullName,
        role: student.role,
      },
    },
  });
});

const me = asyncHandler(async (req, res) => {
  res.json({
    success: true,
    data: req.user,
  });
});

module.exports = {
  register,
  login,
  me,
};
