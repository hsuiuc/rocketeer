const express = require('express');
const spawn = require('child_process').spawn;
const router = express.Router();
const mysql = require("mysql");
const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'cs411CS411!!',
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
    let input = query.input;
    console.log(input);

    // connection.query("select business.id, avg(stars) as avg_stars , group_concat(concat_ws(':', concat('\"', attribute.name, '\"'), value) separator ',')" +
    //     ' as attribute_value_pairs from business, category, attribute where business.id = category.business_id and business.id = attribute.business_id' +
    //     ' and state = ? and city = ? and category = ? group by business.id;', [state, city, category],
    //     function (error, results, fields) {
    //     if (error) {
    //         res.sendStatus(500);
    //         throw error;
    //     } else {
    //         //read
    //         res.status(200).json(results);
    //         console.log(results[0]);
    //         //console.log(results[0]);
    //         //let str = "{\"RestaurantsTableService\":0,\"GoodForMeal\":{\"dessert\": false, \"latenight\": false, \"lunch\": true, \"dinner\": true, \"breakfast\": false, \"brunch\": false},\"Alcohol\":1}";
    //         //console.log(results[0].attribute_value_pairs[26]);
    //         //let str = '{"RestaurantsTableService":"0","GoodForMeal":{"dessert": false, "latenight": false, "lunch": true, "dinner": true, "breakfast": false, "brunch": false},"Alcohol":"none","Caters":"0","HasTV":"1","RestaurantsGoodForGroups":"1","NoiseLevel":"average","WiFi":"no","RestaurantsAttire":"casual","RestaurantsReservations":"0","OutdoorSeating":"0","BusinessAcceptsCreditCards":"1","RestaurantsPriceRange2":"1","BikeParking":"1","RestaurantsDelivery":"0","Ambience":{"romantic": false, "intimate": false, "classy": false, "hipster": false, "divey": false, "touristy": false, "trendy": false, "upscale": false, "casual": true},"RestaurantsTakeOut":"1","GoodForKids":"1","BusinessParking":{"garage": false, "street": true, "validated": false, "lot": false, "valet": false}}';
    //         //console.log(str);
    //
    //         //console.log(JSON.parse(str));
    //
    //     }
    // });

    // connection.query("select review.text from business, category, review where business.id = category.business_id and " +
    //     "business.id = review.business_id and state = ? and city = ? and category.category = ? limit 10", [state, city, category],
    //     function (error, results, fields) {
    //     if (error) {
    //         res.sendStatus(500);
    //         throw error;
    //     } else {
    //         const py = spawn('python3', [process.cwd() + '/routes/test.py']);
    //         let response = "";
    //
    //         py.stdin.write();
    //
    //         py.stdout.on('data', (data) => {
    //             console.log(data);
    //             response += "hehe";
    //
    //         });
    //         py.stdout.on('end', function(){
    //             console.log('end');
    //
    //         });
    //         py.on('exit', (code) => {
    //             console.log(`child process exited with code ${code}`);
    //             res.status(200).json(response);
    //         });
    //
    //     }
    // });
    const py = spawn('python3.4', ['/home/shared/rocketeer/resource/rocketeer.py']);
    //const py = spawn('python', [process.cwd() + '/resource/test.py', 'IL', 'Champaign', 'Thai', '110000111001']);


    console.log(process.cwd());
    let response = "";
    console.log(`Spawned child pid: ${py.pid}`);

    py.stdout.on('data', (data) => {
        response += data.toString();
    });
    py.stdout.on('end', () => {
        console.log(response);
        res.status(200).json(response);
    });
    py.on('exit', (code) => {
        console.log(code);
    });
});

module.exports = router;
