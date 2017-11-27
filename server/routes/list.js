var express = require('express');
var router = express.Router();

var pool = require('../modules/pool');

router.get('/', function (req, res) {
    pool.connect(function (errorConnectingToDatabase, client, done) {//attempting connect to DB
        if (errorConnectingToDatabase) {
            //there was and error connecting to the DB
            console.log('Error connecting to DB', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            //we connected to the DB!
            //Now we are going to GET things from the DB
            client.query('SELECT * FROM list;', function (errorMakingTheQuery, result) {//Query is like from postico
                done();//calls to close the connection and put it back in the pg pool
                if (errorMakingTheQuery) {
                    //Query failed. Did you test it in Postico?
                    //Log the error
                    console.log('Error making query', errorMakingTheQuery);
                    res.sendStatus(500);
                } else {
                    res.send(result.rows);
                }//end else
            });//end func
        }
    });//end connecting to DB
  
  });

  router.post('/', function(req,res){
    //attempt to connect to DB
    pool.connect(function (errorConnectingToDatabase, client, done) {//attempting connect to DB
        if (errorConnectingToDatabase) {
            //there was and error connecting to the DB
            console.log('Error connecting to DB', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            //we connected to the DB!
            //Now we are going to GET things from the DB,below PG helps us not get hacked! ($1,$2) is security
            client.query(`INSERT INTO list (task, notes)
            VALUES ($1, $2);`, [req.body.task, req.body.notes], function (errorMakingTheQuery, result) {//Query is like from postico
                done();//calls to close the connection and put it back in the pg pool
                if (errorMakingTheQuery) {
                    //Query failed. Did you test it in Postico?
                    //Log the error
                    console.log('Error making query', errorMakingTheQuery);
                    res.sendStatus(500);
                } else {
                    res.sendStatus(201);//201 = created
                }//end else
            });//end func
        }
    });//end connecting to DB
  });

  router.delete('/:id', function (req, res) {
    var listItemIdToRemove = req.params.id;
    // Attempt to connect to database
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            // There was an error connecting to the database
            console.log('Error connecting to database', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            // We connected to the database!!!
            // Now, we're going to GET things from thd DB
            client.query(`DELETE FROM list WHERE id=$1;`, [listItemIdToRemove], function (errorMakingQuery, result) {
                done();
                if (errorMakingQuery) {
                    // Query failed. Did you test it in Postico?
                    // Log the error
                    console.log('Error making query', errorMakingQuery);
                    res.sendStatus(500);
                } else {
                    res.sendStatus(200);
                }
            });
        }
    });
});


module.exports = router;