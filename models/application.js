const mongoose = require("mongoose");
// Shortcut variable
const Schema = mongoose.Schema;

const commentSchema = new mongoose.Schema(
  {
    username: {},
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const applicationSchema = new Schema(
  {
    game: {},
    notes: {
      type: String,
      required: true,
    },
    console: {
      type: String,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    comments: [commentSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Application", applicationSchema);
