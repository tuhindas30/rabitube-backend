const { User } = require("../models/user.model");
const { userResponse, HttpError } = require("../utils/helper");
const { doesUserExist } = require("./helper");

const getAllUsers = async (_, res, next) => {
  try {
    const users = await User.find({});
    if (users.length < 1) {
      throw new HttpError(404, "No users found");
    }
    return res.json({
      status: "SUCCESS",
      data: users.map((user) => userResponse(user)),
      message: "All the users",
    });
  } catch (err) {
    next(err);
  }
};

const getUserById = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const user = await doesUserExist(userId);
    res.json({
      status: "SUCCESS",
      data: userResponse(user),
      message: "User found",
    });
  } catch (err) {
    next(err);
  }
};

const updateUserById = async (req, res, next) => {
  const { userId } = req.params;
  const { email } = req.body;
  try {
    await doesUserExist(userId);
    const user = await User.findByIdAndUpdate(userId, { email }, { new: true });
    if (!user) {
      throw new HttpError(404, "User does not exist");
    }
    res.json({
      status: "SUCCESS",
      data: userResponse(user),
      message: "User info updated",
    });
  } catch (err) {
    next(err);
  }
};

const deleteUserById = async (req, res, next) => {
  const { userId } = req.params;
  try {
    await doesUserExist(userId);
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      throw new HttpError(404, "User does not exist");
    }
    res.json({
      status: "SUCCESS",
      data: {},
      message: "User deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllUsers, getUserById, updateUserById, deleteUserById };
