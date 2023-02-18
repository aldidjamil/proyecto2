const { Schema, model } = require("mongoose");
const movieSchema = new Schema(
  {
    image: { type: String },
    title: { type: String },
    genres: { type: String, required: true },
    stars: { type: String },
    plot: { type: String },
    imDbRating: { type: String },
    comment: {
      ref: 'Comment',
      type: Schema.Types.ObjectId
    },

  },
  {
    timestamps: true
  }
);
const Movie = model("Movie", userSchema);
module.exports = User;