require('dotenv/config')

const mysql = require('mysql')

const connection = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_NAME
})

// create table
connection.connect((err) => {
	if (err) throw err;

	// datetime (DATETIME, defaults to current date) | date (DATE, unique, generated from datetime) | bones (BOOLEAN) 
	const query = 'CREATE TABLE `bones` (\
			`datetime` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,\
			`date` DATE AS (DATE(`datetime`)),\
			`bones` BOOLEAN NOT NULL,\
			UNIQUE (`date`))'
	connection.query(query, (err, result) => {
		if (err) throw err;
		console.log("Table created")
		console.log(JSON.stringify(result))
	})
})
