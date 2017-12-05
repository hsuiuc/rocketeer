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

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.sendFile(path.join(__dirname, '/index.html'));
    const queryWhere = req.query.where;
    const query = JSON.parse(queryWhere);

    let state = query.state;
    let city = query.city;
    let category = query.category; //an array of string

    connection.query('select * from business, category where business.id = category.business_id and state = ? and city = ? and category = ? limit 25', [state, city, category], function (error, results, fields) {
        if (error) {
            res.sendStatus(500);
            throw error;
        } else {
            //read
            res.status(200).json(results);
            //console.log(JSON.stringify(results));
        }
    });
});

module.exports = router;
