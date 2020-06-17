const  mysql = require('mysql');
const  connection = mysql.createConnection({
host :  'localhost',
user :  'root',
password :  'ED89mysql!',
database :  'person_quest',
});
module.exports = connection;