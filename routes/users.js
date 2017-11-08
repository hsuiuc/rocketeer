const express = require('express');
const router = express.Router();
const mysql = require("mysql");
const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'abcde12345',
    database : 'yelp_db'
});
connection.connect();

/* GET users listing. */
router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
    const state = req.query.state;
    const city = req.query.city;
    const neighbourhood = req.query.neighbourhood;

    connection.query("select * from business where state = ? AND city = ? limit 5", [state, city], function (error, results, fields) {
        if (error) {
            throw error;
        } else {
            //console.log("send response : " + JSON.stringify(results));
            res.status(200).send(JSON.stringify(results));
        }
    });
});

module.exports = router;
