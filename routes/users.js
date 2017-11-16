const express = require('express');
const router = express.Router();
const mysql = require("mysql");
const crypto = require("crypto");
const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'cs411CS411!!',
    database : 'yelp_db'
});
connection.connect();

/* GET users listing. */
router.post('/', function(req, res, next) {
  //res.send('respond with a resource');
    const name = req.query.name;
    const neighborhood = req.query.neighborhood;
    const address = req.query.address;
    const city = req.query.city;
    const state = req.query.state;
    const postal_code = req.query.postal_code;
    const lat = req.query.lat;
    const long = req.query.long;
    const operationType = parseInt(req.query.operationType);
    const radius = req.query.radius;

    connection.query("select * from business where name = ? limit 5", [name], function (error, results, fields) {
        if (error) {
            res.sendStatus(500);
            throw error;
        } else if (results.length === 0) {
            console.log("create");
            //create
            //let id = crypto.randomBytes(11).toString("hex");
            //console.log(id);
            // let createSql = "INSERT INTO business (id, name, neighborhood, address, city, state, postal_code, latitude," +
            //     "longitude) VALUES ?";
            let createSql = "INSERT INTO business (id, name) VALUES ?";
            // [id, name, neighborhood, address, city, state, postal_code, lat, long]
            let value = ['aaa', 'test'];
            connection.query(createSql, value, function (error) {
                if (error) {
                    res.sendStatus(500);
                    throw error;
                } else {
                    res.sendStatus(200);
                    console.log("one record inserted");
                }
            });
        } else if (operationType === 3) {
            //update
            let updateSql = "UPDATE business SET neighborhood = ?, address = ?, city = ?, state = ?, postal_code = ?," +
                "latitude = ?, longitude = ? WHERE name = ?";
            connection.query(updateSql, [neighborhood, address, city, state, postal_code, lat, long, name], function (error) {
                if (error) {
                    res.sendStatus(500);
                    throw error;
                } else {
                    res.sendStatus(200);
                    console.log("one record updated");
                }
            });
        } else if (operationType === 2) {
            //read
            res.status(200).send(JSON.stringify(results));
            console.log(JSON.stringify(results));
        } else if (operationType === 4){
            //delete
            let deleteSql = "DELETE FROM business WHERE name = ?";
            connection.query(deleteSql, [name], function (error) {
                if (error) {
                    res.sendStatus(500);
                    throw error;
                } else {
                    res.sendStatus(200);
                    console.log("one record deleted");
                }
            });
        }
    });
});

module.exports = router;
