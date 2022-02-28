const mysql = require('mysql2');

const is_heroku = process.env.IS_HEROKU || false;

const dbConfigHeroku = {
	host: "ble5mmo2o5v9oouq.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
	user: "b7cp5wy1r0h0z3iz",
	password: "qtcszhs6l9jdhvau",
	database: "d0u2shx1pv2ca085",
	multipleStatements: false, 
    namedPlaceholders:true
};

const dbConfigLocal = {
	host: "localhost",
	user: "root",
	password: "Pelusa199",
	database: "restaurant_review", //lab_example
	multipleStatements: false, 
    namedPlaceholders:true
};

if (is_heroku) {
	var database = mysql.createPool(dbConfigHeroku);
}
else {
	var database = mysql.createPool(dbConfigLocal);
}

module.exports = database;
