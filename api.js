console.log(process.env.MYSQL_USER);

const express = require('express');
const mysql = require('mysql')

const app = express();
const port = 8080;

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'juego'
});

connection.connect(err => {
  if (err) {
    console.error('Unable to connect to the database.');
    throw err;
  } else {
    console.log('Connected to the database.');
  }
});

app.set('view engine', 'ejs')
app.use(express.static(__dirname+'/public'))

app.get('/', (req,res) => {
    res.render('index')
})


app.get('/register/page', (req,res) =>  {
  res.render('register')
})

app.get('/login/:user/:pass', (req,res) => {

})

app.listen(port,() => {
    console.log('funciona!!!')
})
