const { Schema, model } = require("mongoose");
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true
    },
    email: {
      type: String,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    avatar:
    {
      type: String,
      default: 'https://i.stack.imgur.com/l60Hf.png'
    },
    favoriteMovies: [{
      ref: 'Movie',
      type: Schema.Types.ObjectId
    }],
    watchList: [{
      ref: 'Movie',
      type: Schema.Types.ObjectId
    }],
    role: {
      type: String,
      enum: ['USER', 'ADMIN'],
      default: 'USER'
    }
  },
  {
    timestamps: true
  }
);
const User = model("User", userSchema);
module.exports = User;

