const { Schema, model } = require("mongoose");

const movieSchema = new Schema(
  {
    title: {
      type: String,
      require: true,
    },
    plot: String,
    genre: String,
    year: String,
    director: String,
    cast: String,
    trailer: String,
    rating: Schema.Types.Decimal128,
    image: {
      type: String,
      default: "/images/movieDummy.png",
    },
    _group: Schema.Types.ObjectId,
  },
  {
    timestamps: true,
  }
);

const Movie = model("Movie", movieSchema);

module.exports = Movie;
