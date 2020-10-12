// Update with your config settings.

module.exports = {
  development: {
    client: "pg",
    connection: {
      host: "localhost",
      user: "postgres",
      password: "s3cr3t",
      database: "imdb",
      charset: "utf8",
    },
    debug: true,
  },

  test: {
    client: "pg",
    connection: {
      host: "localhost",
      user: "postgres",
      password: "s3cr3t",
      database: "imdb",
      charset: "utf8",
    },
    useNullAsDefault: true,
  },

  production: {
    client: "pg",
    connection: {
      host: "ec2-34-232-212-164.compute-1.amazonaws.com",
      user: "wkaaxjzxxosvow",
      password:
        "e10707b4d779745ec504a0db61f26c22a8d8b2a02f9c68f16128b902b2340450",
      database: "d637vcp3k3e63v",
      charset: "utf8",
    },
    useNullAsDefault: true,
  },
};
