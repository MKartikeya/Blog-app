const mongoose = require("mongoose");

const ReadLaterSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    postIds: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("ReadLater", ReadLaterSchema);
