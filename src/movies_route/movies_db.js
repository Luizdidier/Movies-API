const knex = require("../../config/knex/knex");

async function getMovies(filter, offset, per_page) {
  const query = knex
    .select("name", "gender", "directors", "release_year as year", "stars")
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

module.exports = {
  getMovies,
  createMovies,
  countMoviesList,
};
