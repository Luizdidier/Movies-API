const moviesDb = require("./movies_db");
const generateToken = require("../shared/generate_token");
const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth.json");
const yup = require("yup");
const getProfile = require("../shared/get_profile");
const roles = require("../config/roles.json");

async function getMovies(req, res, next) {
  try {
    const filter = req.query;

    const authHeader = req.headers.authorization;
    const partsToken = authHeader.split(" ");
    const decodedJWT = jwt.verify(partsToken[1], authConfig.secret);

    const per_page = filter.per_page || 10;
    const page = filter.page || 1;
    if (page < 1) page = 1;
    const offset = (page - 1) * per_page;

    const movies = await moviesDb.getMovies(filter, offset, per_page);
    const [countMovies] = await moviesDb.countMoviesList(filter);

    const pagination = {
      page,
      per_page,
      total: countMovies.count,
    };

    res.status(200).json({
      movies,
      pagination,
      token: generateToken({ id: decodedJWT.id }),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
    next(err);
  }
}

async function createMovies(req, res, next) {
  try {
    const data = req.body;
    const authHeader = req.headers.authorization;
    const partsToken = authHeader.split(" ");
    const decodedJWT = jwt.verify(partsToken[1], authConfig.secret);

    const [profile] = await getProfile({ id: decodedJWT.id });
    if (profile.role === roles.ADMIN) {
      let schema = yup.object({
        name: yup.string().required(),
        gender: yup.string().required(),
        directors: yup.string().required(),
        description: yup.string().required(),
        stars: yup.string().required(),
        year: yup.string().min(4).max(4).required("Year must be a valid year"),
      });
      await schema.validate(data, { abortEarly: false });
      await moviesDb.createMovies(data);

      return res.status(200).json({
        message: "Movie successfully created",
        token: generateToken({ id: decodedJWT.id }),
      });
    } else {
      return res.status(403).json({
        message: "Unauthorized access",
        token: generateToken({ id: decodedJWT.id }),
      });
    }
  } catch (err) {
    if (err.errors && err.errors.length > 0)
      return res.status(400).json({ validation: err.errors });

    res.status(500).json({ error: err.message });
    next(err);
  }
}

async function ratingMovies(req, res, next) {
  try {
    const data = req.body;
    const authHeader = req.headers.authorization;
    const partsToken = authHeader.split(" ");
    const decodedJWT = jwt.verify(partsToken[1], authConfig.secret);

    let schema = yup.object({
      movieId: yup.number().required(),
      rate: yup.number().min(0).max(4).required(),
    });

    await schema.validate(data, { abortEarly: false });

    const movie = await moviesDb.getMovieById(data.movieId);

    if (movie.length > 0) {
      const [verifyVote] = await moviesDb.verifyRatingUser(data, decodedJWT.id);
      if (verifyVote.count == 0) {
        await moviesDb.votingMovie(data, decodedJWT.id);
        return res.status(200).json({
          message: "Successfully evaluated",
          token: generateToken({ id: decodedJWT.id }),
        });
      } else {
        return res.status(200).json({
          message: "You already rated this movie",
          token: generateToken({ id: decodedJWT.id }),
        });
      }
    } else {
      return res.status(404).json({
        message: "Movie not found !",
        token: generateToken({ id: decodedJWT.id }),
      });
    }
  } catch (err) {
    if (err.errors && err.errors.length > 0)
      return res.status(400).json({ validation: err.errors });

    res.status(500).json({ error: err.message });
    next(err);
  }
}

async function detailMovie(req, res, next) {
  try {
    const data = req.params;
    const authHeader = req.headers.authorization;
    const partsToken = authHeader.split(" ");
    const decodedJWT = jwt.verify(partsToken[1], authConfig.secret);

    const [movie] = await moviesDb.getMovieById(data.movieId);

    if (movie) {
      const [rating] = await moviesDb.ratingMovie(data.movieId);

      const showDetail = {
        ...movie,
        rate: Number(rating.rate).toFixed(2),
      };

      return res.status(200).json({
        movie: showDetail,
        token: generateToken({ id: decodedJWT.id }),
      });
    } else {
      return res.status(404).json({
        message: "Movie not found !",
        token: generateToken({ id: decodedJWT.id }),
      });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
    next(err);
  }
}

module.exports = {
  getMovies,
  createMovies,
  ratingMovies,
  detailMovie,
};
