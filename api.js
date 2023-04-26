const express = require('express');
const mysql = require('mysql')

const app = express();
const port = 8080;

const connection = mysql.createConnection({
  host: 'localhost',
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
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
  let user = req.params.user;
  let sql = "select idUsuario,Contraseña from usuario where idUsuario = ?";
  connection.query(
    sql,[user],
    (err, result) => {
      if (err) {
        throw err;
      } else {
        console.log(result);
        res.contentType('text/plain');
        res.send(result[0].idUsuario);
      }
    }
  );
})

app.listen(port,() => {
    console.log('funciona!!!')
})
