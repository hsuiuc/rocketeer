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

    if (category === "" || category === undefined) {
        connection.query('select category, avg(stars) as avg_stars, count(*) as count from business, category where state = ? and city = ? ' +
            'and business.id = category.business_id group by category order by avg(stars) desc',
            [state, city], function (error, results, fields) {
            if (error) {
                res.sendStatus(500);
                throw error;
            } else {
                //read
                res.status(200).json(results);
                //console.log(JSON.stringify(results));
            }
        });
    } else {
        connection.query('select city, avg(stars) as avg_star, count(*) as count from business, category where state = ? and category.category = ? ' +
            'and business.id = category.business_id group by city order by avg(stars) desc',
            [state, category], function (error, results, fields) {
                if (error) {
                    res.sendStatus(500);
                    throw error;
                } else {
                    //read
                    res.status(200).json(results);
                    //console.log(JSON.stringify(results));
                }
            });
    }
});

module.exports = router;
