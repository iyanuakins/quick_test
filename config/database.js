const mysql = require('mysql');

// First you need to create a connection to the db
const db = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'quick_test'
});

db.connect ((err) => {
    if (err) {
        console.log(`Error connecting to Db: ${err}`);
        return;
    }
    console.log (`Connection established`);
});

module.exports = db;