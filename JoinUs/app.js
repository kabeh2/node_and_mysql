require('dotenv').config();
const express = require('express');
const faker = require('faker');
const mysql = require('mysql');
const ejs = require('ejs');

const app = express();

var connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

app.post('/register', (req, res, next) => {
  //   console.log(req.body.email);
  let person = {
    email: req.body.email,
  };
  const q = 'INSERT INTO users SET ?';
  connection.query(q, person, (err, results) => {
    if (err) throw err;
    // res.send(`Thanks for joining our wait list with email ${person.email}`);
    console.log(result);
    res.redirect('/');
  });
});

app.get('/', function (req, res) {
  var q = 'SELECT COUNT(*) as count FROM users';
  connection.query(q, function (error, results) {
    if (error) throw error;
    // var msg = 'We have ' + results[0].count + ' users';
    // res.send(msg);
    let count = results[0].count;
    res.render('home', { count: count });
  });
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server running on port ${port}...`));
