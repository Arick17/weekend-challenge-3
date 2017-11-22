var pg = require('pg');

var config = {//this object is going to tell pg what to do
    database: 'shoe_store', //name of our database
    host: 'localhost',//where is your database, what computer?
    port: 5432,//port to connect to database, 5432 is default
    max: 10, //how many connections at one time OOOoooOOO
    idleTimoutMillies: 30000 //30 seconds to try to connect to our database
};

var pool = new pg.Pool(config);//this is creating a pool of connections to pg (10 from above)

module.exports = pool;