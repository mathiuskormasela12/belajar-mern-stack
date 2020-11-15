// ===== import mysql modules
const mysql		= require('mysql');

class Database {
	constructor() {
		this.db	= mysql.createConnection({
			host:	process.env.DB_HOST,
			user: process.env.DB_USER,
			password: process.env.DB_PASS,
			database: process.env.DB_NAME
		});

	this.connect();
	}

	connect() {
		this.db.connect(err => {
			if(err)
				console.log(err);
			else
				console.log('Database has been connected');
		});
	}
}

module.exports = Database;