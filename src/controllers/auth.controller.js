const { User } = require("../models/user.model");
const { HttpError } = require("../utils/helper");

const signup = async (req, res, next) => {
  try {
    const userData = req.body;
    const saveUser = await new User(userData).save();
    res.json({ status: "SUCCESS", message: "User saved successfully", user: saveUser });
  } catch (err) {
    next(err);
  }
}

const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });

    if (!user) {
      throw new HttpError(401, "Email does not exist");
    }

    if (password === user.password) {
      user.__v = undefined;
      user.password = undefined;
      return res.json({ status: "SUCCESS", message: "User signed in successfully", user });
    }
      throw new HttpError(401, "Password not matched");
  } catch (err) {
    next(err);
  }
}

const changePassword = async (req, res, next) => {
  try {
    const { userId, oldPassword, newPassword } = req.body;
    const user = await User.findById(userId);

    if (oldPassword === user.password) {
      user.password = newPassword;
      await user.save();
      return res.json({ status: "SUCCESS", message: "Password changed successfully", user });
    }
    throw new HttpError(401, "Your old password not matched")
  } catch (err) {
    next(err);
  }
}

module.exports = { signup, signin, changePassword }