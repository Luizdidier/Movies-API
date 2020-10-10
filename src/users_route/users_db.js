const knex = require("../../config/knex/knex");
const bcrypt = require("bcryptjs");

async function registerUsers(data, trx) {
  const insertData = {
    username: data.username,
    password: await bcrypt.hash(data.password, 10),
    email: data.email,
    firstname: data.firstname,
    lastname: data.lastname,
    created_on: new Date(),
  };

  const query = await trx("users").insert(insertData).returning("id");
  return query;
}

async function getByUsername(username) {
  const query = await knex
    .select(
      "users.username",
      "users.id",
      "users.password",
      "roles.description as role "
    )
    .from("users")
    .innerJoin("user_roles", "users.id", "user_roles.user_id")
    .innerJoin("roles", "roles.id", "user_roles.role_id")
    .where({ username })
    .andWhere({ active: true });
  return query;
}

async function getById(id) {
  const query = await knex
    .select(
      "users.username",
      "users.id",
      "users.password",
      "roles.description as role ",
      "users.active"
    )
    .from("users")
    .innerJoin("user_roles", "users.id", "user_roles.user_id")
    .innerJoin("roles", "roles.id", "user_roles.role_id")
    .where({ "users.id": id });
  return query;
}

async function getAllRoles() {
  const query = await knex.select().from("roles");
  return query;
}

async function setRoles(data, trx) {
  const query = await trx("user_roles").insert(data);
  return query;
}

async function activeOrDeactiveUser(payload, id) {
  const query = await knex
    .update({
      active: payload,
    })
    .from("users")
    .where({ id: id });

  return query;
}

async function updateUser(payload) {
  const query = await knex
    .update({
      firstname: payload.firstname,
      lastname: payload.lastname,
      email: payload.email,
    })
    .from("users")
    .where({ id: payload.id });

  return query;
}

module.exports = {
  registerUsers,
  getByUsername,
  getAllRoles,
  setRoles,
  getById,
  activeOrDeactiveUser,
  updateUser,
};
