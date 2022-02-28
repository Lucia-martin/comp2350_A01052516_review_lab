const mysql = require('mysql2');

const is_heroku = process.env.IS_HEROKU || false;

const dbConfigHeroku = {
	host: "ckshdphy86qnz0bj.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
	user: "vg6pkxehelco2587",
	password: "dn6rx84pfpudqktr",
	database: "kqvbwep73wbpmutu",
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