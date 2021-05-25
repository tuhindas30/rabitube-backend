const { extend } = require("lodash");
const { User } = require("../models/user.model");
const { HttpError } = require("../utils/helper");

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({})
      .populate("watchlater")
      .populate("liked")
      .populate("playlists.videos");

    if (!users) {
      throw new HttpError(404, "No users exist");
    }
    return res.json({ status: "SUCCESS", message: "All the users", users });
  } catch (err) {
    next(err);
  }
};

const findUser = async (req, res, next, userId) => {
  try {
    const user = await User.findById(userId)
      .populate("watchlater")
      .populate("playlists.videos")
      .populate("liked");

    if (!user) {
      const err = new HttpError(404, "User does not exist");
      next(err);
    }

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

const getUser = async (req, res, next) => {
  let { user } = req;
  user.password = undefined;
  user.__v = undefined;
  res.json({ status: "SUCCESS", message: "User found", user });
};

const updateUser = async (req, res, next) => {
  try {
    let { user } = req;
    const updateKey = req.body;
    user = extend(user, updateKey);
    user = await user.save();
    res.json({ status: "SUCCESS", message: "User info updated", user });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllUsers, findUser, getUser, updateUser };
