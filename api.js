const express = require('express');
const mssql = require('mssql');

const app = express();
const port = 8080;
const ipAddr = 'localhost';

const dbConfig = {
  user: process.env.MSSQL_USER,
  password: process.env.MSSQL_PASSWORD,
  database: 'juego',
  server: 'localhost',
  pool: { max: 10, min: 0, idleTimeoutMillis: 30000 },
  options: { trustServerCertificate: true }
};

async function connectDb() {
  try {
    await mssql.connect(dbConfig);
    console.log('Connected to the database.');
  } catch (err) {
    console.error('Unable to connect to the database.');
    throw err;
  }
}

connectDb();

app.set('view engine', 'ejs')
app.use(express.static(__dirname+'/public'))

app.get('/', (req,res) => {
    res.render('index')
})


app.get('/register/page', (req,res) =>  {
  res.render('register')
})

app.get('/login/:user/:pass', async (req,res) => {
  try {
    const user = req.params.user;
    const pass = req.params.pass;

    const rows = (await mssql.query`select idUsuario,contraseña from usuario where idUsuario = ${user}`).recordset;

    const user_data = rows[0];

    let login_response = {login_validation:'0', user:user};

    if (user_data['idUsuario'] == user && user_data['contraseña'] == pass) {
      login_response.login_validation = '1';
    }

    res.json(login_response);

  } catch (err) {
    res.json(err);
  }
})

app.listen(port,() => {
    console.log('funciona!!!');
})
