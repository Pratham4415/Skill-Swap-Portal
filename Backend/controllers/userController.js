const user = require("../models/userModel");

exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await user.findOneAndUpdate({ _id: req.user._id }).select("+password");
    if (req.body.email) {
      return res.status(400).json({ message: "not allowed to change email" });
    }
    Object.assign(updatedUser, req.body);
    await updatedUser.save();

    res.status(200).json({
      status: "success",
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to update user",
      error: error.message,
    });
  }
};
