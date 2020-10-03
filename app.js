require('dotenv').config();
const faker = require('faker');
const mysql = require('mysql');

var connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// ADDING IN ONE ARGUMENT USE OBJECT
// const person = {
//   email: faker.internet.email(),
//   created_at: faker.date.past(),
// };

// let person = [[faker.internet.email(), faker.date.past()]];

// INSERTING MULTIPLE ARGS, USE ARRAY OF ARRAYS, AND CALL IN AN ARRAY
// FOR LOOP IS FASTER THOUGH, BUT ARRAY.FROM (AKA forEach)
// BETTER FITS FUNCTIONAL PROGRAMMING PARADIGMS
let person = Array.from({ length: 500 }, () => [
  faker.internet.email(),
  faker.date.past(),
]);

connection.connect();

// connection.query(
//   'INSERT INTO users (email, created_at) VALUES ?',
//   [person],
//   function (error, results) {
//     if (error) throw error;
//     console.log(results);
//   }
// );

// FIND EARLIEST DATE A USER JOINED
// const q =
//   'SELECT DATE_FORMAT(MIN(created_at), "%M %D %Y") AS "earliest date" FROM users;';

// FIND EMAIL OF THE FIRST (EARLIEST) USER SHOWING BOTH EMAIL AND CREATED_AT
// const q = 'SELECT * FROM users WHERE created_at=(SELECT MIN(created_at) FROM users);';


// USERS ACCORDING TO THE MONTH THEY JOINED
// const q =
//   'SELECT MONTHNAME(created_at) AS month, COUNT(*) AS count FROM users GROUP BY month ORDER BY count DESC;';

// COUNT NUMBER OF USERS WITH YAHOO EMAILS
// const q =
//   'SELECT COUNT(*) AS yahoo_users FROM users WHERE email LIKE "%@yahoo.com";';

// CALCULATE TOTAL NUMBER OF USERS FOR EACH EMAIL HOST
const q = `SELECT CASE
    WHEN email LIKE "%@gmail.com" THEN "gmail"
    WHEN email LIKE "%@yahoo.com" THEN "yahoo"
    WHEN email LIKE "%@hotmail.com" THEN "hotmail"
    ELSE "other"
END AS provider,
COUNT(*) AS total_users
FROM users
GROUP BY provider
ORDER BY total_users DESC;`


connection.query(q, (error, results, fields) => {
  if (error) throw error;
  console.log(results);
});

connection.end();
