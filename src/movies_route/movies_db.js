const knex = require("../../config/knex/knex");

async function getMovies(filter, offset, per_page) {
  const query = knex
    .select(
      "id",
      "name",
      "gender",
      "directors",
      "release_year as year",
      "stars"
    )
    .from("movies");

  if (filter.gender)
    query.where("gender", "ilike", `%${filter.gender.trim()}%`);
  if (filter.name) query.where("name", "ilike", `%${filter.name.trim()}%`);
  if (filter.stars) query.where("stars", "ilike", `%${filter.stars}%`);
  if (filter.director)
    query.where("directors", "ilike", `%${filter.director}%`);

  return query.offset(offset).limit(per_page);
}

async function countMoviesList(filter) {
  const query = knex.count().from("movies");

  if (filter.gender)
    query.where("gender", "ilike", `%${filter.gender.trim()}%`);
  if (filter.name) query.where("name", "ilike", `%${filter.name.trim()}%`);
  if (filter.stars) query.where("stars", "ilike", `%${filter.stars}%`);
  if (filter.director)
    query.where("directors", "ilike", `%${filter.director}%`);

  return query;
}

async function createMovies(payload) {
  const query = knex
    .insert({
      name: payload.name,
      gender: payload.gender,
      directors: payload.directors,
      description: payload.description,
      release_year: payload.year,
      stars: payload.stars,
    })
    .from("movies");

  return query;
}

async function votingMovie(payload, userId) {
  const query = knex
    .insert({
      movies_id: payload.movieId,
      rating: payload.rate,
      user_id: userId,
    })
    .from("rating");

  return query;
}

async function verifyRatingUser(payload, userId) {
  const query = knex
    .count()
    .from("rating")
    .where({ movies_id: payload.movieId })
    .andWhere({ user_id: userId });

  return query;
}

async function getMovieById(movieId) {
  const query = knex
    .select(
      "name",
      "gender",
      "directors",
      "release_year as year",
      "stars",
      "description"
    )
    .from("movies")
    .where("id", movieId);

  return query;
}

async function ratingMovie(movieId) {
  const query = knex
    .avg("rating as rate")
    .from("rating")
    .where("movies_id", movieId);

  return query;
}

module.exports = {
  getMovies,
  createMovies,
  countMoviesList,
  votingMovie,
  verifyRatingUser,
  getMovieById,
  ratingMovie,
};
