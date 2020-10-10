const yup = require("yup");
const usersDb = require("./users_db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth.json");
const knex = require("../../config/knex/knex");

function _generateToken(params = {}, time = 86400) {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: time,
  });
}

async function registerUser(req, res, next) {
  try {
    const data = req.body;

    let schema = yup.object({
      username: yup.string().required(),
      password: yup.string().min(6).required(),
      firstname: yup.string().required(),
      lastname: yup.string().required(),
      email: yup.string().email().required(),
    });

    await schema.validate(data, { abortEarly: false });

    const verifyUsername = await usersDb.getByUsername(data.username);

    if (verifyUsername.length > 0)
      return res.status(200).json({ message: "user already registered" });

    let roles = await usersDb.getAllRoles();

    if (data.isAdmin) roles = roles.filter((el) => el.description === "ADMIN");
    else roles = roles = roles.filter((el) => el.description !== "ADMIN");

    [roles] = roles;

    await knex.transaction(async (trx) => {
      try {
        const [user] = await usersDb.registerUsers(data, trx);
        await usersDb.setRoles({ role_id: roles.id, user_id: user }, trx);
        trx.commit();

        return res.status(200).json({
          userId: user,
          token: _generateToken({ id: user }),
        });
      } catch (e) {
        trx.rollback();
      }
    });
  } catch (err) {
    if (err.errors && err.errors.length > 0)
      return res.status(400).json({ validation: err.errors });

    res.status(500).json({ error: err.message });
    next(err);
  }
}

async function authUser(req, res, next) {
  try {
    const data = req.body;

    let schema = yup.object({
      username: yup.string().required(),
      password: yup.string().required(),
    });

    await schema.validate(data, { abortEarly: false });

    let user = await usersDb.getByUsername(data.username);

    if (user.length <= 0)
      return res.status(404).json({ error: "user not found" });

    var passwordIsValid = bcrypt.compareSync(data.password, user[0].password);

    if (!passwordIsValid)
      return res.status(400).json({ error: "invalid password" });

    [user] = user;
    delete user.password;
    delete user.role_id;
    delete user.user_id;

    return res.status(200).json({
      user,
      token: _generateToken({ id: user.id }),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
    next(err);
  }
}

async function activeOrDeactiveUser(req, res, next) {
  try {
    const path = req.path;
    const data = req.body;

    if (path.includes("delete")) {
      const authHeader = req.headers.authorization;
      const partsToken = authHeader.split(" ");
      const decodedJWT = jwt.verify(partsToken[1], authConfig.secret);

      await usersDb.activeOrDeactiveUser(false, decodedJWT.id);
      return res.status(200).json({
        message: "User successfully deleted",
        token: _generateToken({ id: decodedJWT.id }, 0),
      });
    }
    if (path.includes("active")) {
      const user = await usersDb.getById(data.userId);

      if (user.length === 0) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      if (user.length > 0 && user[0].active) {
        return res.status(200).json({
          message: "User is already active",
        });
      }

      if (user.length > 0 && !user[0].active) {
        await usersDb.activeOrDeactiveUser(true, data.userId);
        return res.status(200).json({
          message: "User successfully active",
        });
      }
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
    next(err);
  }
}

async function updateUser(req, res, next) {
  try {
    let data = req.body;

    let schema = yup.object({
      firstname: yup.string().required(),
      lastname: yup.string().required(),
      email: yup.string().email().required(),
    });

    await schema.validate(data, { abortEarly: false });

    const authHeader = req.headers.authorization;
    const partsToken = authHeader.split(" ");
    const decodedJWT = jwt.verify(partsToken[1], authConfig.secret);

    await usersDb.updateUser({ ...data, id: decodedJWT.id });

    res.status(200).send(data);
  } catch (err) {
    if (err.errors && err.errors.length > 0)
      return res.status(400).json({ validation: err.errors });

    res.status(500).json({ error: err.message });
    next(err);
  }
}

module.exports = {
  registerUser,
  authUser,
  activeOrDeactiveUser,
  updateUser,
};
