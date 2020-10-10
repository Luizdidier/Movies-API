async function getMovies(req, res, next) {
  try {
    res.status(200).json({ message: "pegou!!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
    next(err);
  }
}

module.exports = {
  getMovies,
};
