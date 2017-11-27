// var pg = require('pg');

// var config = {//this object is going to tell pg what to do
//     database: 'to_do_list', //name of our database
//     host: 'localhost',//where is your database, what computer?
//     port: 5432,//port to connect to database, 5432 is default
//     max: 10, //how many connections at one time OOOoooOOO
//     idleTimoutMillies: 30000 //30 seconds to try to connect to our database
// };

// var pool = new pg.Pool(config);//this is creating a pool of connections to pg (10 from above)

// module.exports = pool;


var pg = require('pg');
var url = require('url');
var config = {};

if (process.env.DATABASE_URL) {
  // Heroku gives a url, not a connection object
  // https://github.com/brianc/node-pg-pool
  var params = url.parse(process.env.DATABASE_URL);
  var auth = params.auth.split(':');

  config = {
    user: auth[0],
    password: auth[1],
    host: params.hostname,
    port: params.port,
    database: params.pathname.split('/')[1],
    ssl: true, // heroku requires ssl to be true
    max: 10, // max number of clients in the pool
    idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
  };

} else {
  config = {
    user: process.env.PG_USER || null, //env var: PGUSER
    password: process.env.DATABASE_SECRET || null, //env var: PGPASSWORD
    host: process.env.DATABASE_SERVER || 'localhost', // Server hosting the postgres database
    port: process.env.DATABASE_PORT || 5432, //env var: PGPORT
    database: process.env.DATABASE_NAME || 'to_do_list', //env var: PGDATABASE or the name of your database (e.g. database: process.env.DATABASE_NAME || 'koala_holla',)
    max: 10, // max number of clients in the pool
    idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
  };
}

module.exports = new pg.Pool(config);