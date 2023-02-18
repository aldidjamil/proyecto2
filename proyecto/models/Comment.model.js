const { Schema, model } = require("mongoose");
const commentSchema = new Schema(
  {
    username: {
      ref: 'User',
      type: Schema.Types.ObjectId
    },
    comment: { type: String },

  },
  {
    timestamps: true
  }
);
const Comment = model("Comment", commentSchema);
module.exports = Comment;