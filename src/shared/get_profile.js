const knex = require("../../config/knex/knex");

module.exports = async (params = {}) => {
  try {
    const query = await knex
      .select("roles.description as role ")
      .from("users")
      .innerJoin("user_roles", "users.id", "user_roles.user_id")
      .innerJoin("roles", "roles.id", "user_roles.role_id")
      .where({ "users.id": params.id });

    return query;
  } catch (err) {
    return err.message;
  }
};
