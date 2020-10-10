// Update with your config settings.

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host : 'localhost',
      user : 'postgres',
      password : 's3cr3t',
      database : 'imdb',
      charset: 'utf8'
    },
    debug: true
  },

  test: {
    client: 'pg',
    connection: {
      host : 'localhost',
      user : 'postgres',
      password : 's3cr3t',
      database : 'imdb',
      charset: 'utf8'
    },
    useNullAsDefault: true
  },

  production: {
    client: 'pg',
    connection: {
      host : 'localhost',
      user : 'postgres',
      password : 's3cr3t',
      database : 'imdb',
      charset: 'utf8'
    },
    useNullAsDefault: true
  }
}