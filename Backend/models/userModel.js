const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  bio: {
    type: String,
    default: "",
  },
  skillsOffered: {
    type: [String],
    default: [],
  },
  skillsWanted: {
    type: [String],
    default: [],
  },
  profilePic: {
    type: String,
    default: "",
  },
  location: {
    type: String,
    required: true,
  },
  ratings: {
    type: [
      {
        fromUser: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        rating : { type: Number, min: 1, max: 5 },
        Comment : { type: String, default: "" },
      },
    ],
  },
},{timestamps: true});

userSchema.pre('save',async function (next) {
  if(!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password,salt)
  next();
});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;