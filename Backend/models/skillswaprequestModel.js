const mongoose = require("mongoose");

const swaprequestSchema = new mongoose.Schema(
  {
    fromUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    toUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    skillOffered: {
      type: [String],
      required: true,
    },
    skillWanted: {
      type: [String],
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected", "completed"],
      default: "pending",
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);

const SwaprequestModel = mongoose.model("skillswaprequest", swaprequestSchema);

module.exports = SwaprequestModel;
