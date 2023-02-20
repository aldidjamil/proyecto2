const { Schema, model } = require("mongoose");
const movieSchema = new Schema(
  {
    image: {
      type: String
    },
    title: {
      type: String
    },
    genres: [{
      type: String
    }],
    stars: [{
      type: String
    }],
    plot: {
      type: String
    },
    rating: {
      type: String
    },
    comments: [{
      ref: 'Comment',
      type: Schema.Types.ObjectId
    }],

  },
  {
    timestamps: true
  }
);
const Movie = model("Movie", movieSchema);
module.exports = Movie;