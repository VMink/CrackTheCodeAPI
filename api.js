const express = require('express');
const mssql = require('mssql');
const { createHash } = require('crypto');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
const port = 8080;
const ipAddr = '52.55.120.19';

app.set('view engine', 'ejs')
app.use(express.static(__dirname+'/public'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

function hashSHA3_256(data) {
  const hash = createHash('sha3-256');
  hash.update(data);
  return hash.digest('hex');
}

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

app.get('/', (req,res) => {
    res.render('index')
});


app.get('/register-page', (req,res) =>  {
  res.render('register')
});


app.get('/login/:idUsuario/:pass', async (req,res) => {
  try {

    // const {idUsuario,contraseña} = req.body;

    const idUsuario = req.params.idUsuario;
    const contraseña = req.params.pass;

    const query = "select idUsuario,contraseña from usuario where idUsuario = @user";
    const request = new mssql.Request();
    request.input('user', mssql.VarChar, idUsuario);

    request.query(query, (err, result) => {
      if (err) {
        res.status(500);
        res.json(err);
        console.log(err);
      } else {
        const user_data = result.recordset[0];

        let login_response = {login_validation:'0', idUsuario:idUsuario};

        if (user_data && user_data['idUsuario'] == idUsuario && user_data['contraseña'] == hashSHA3_256(contraseña)) {
          login_response.login_validation = '1';
        }
        res.json(login_response);
      }
    });

  } catch (err) {
    res.status(500);
    res.json(err);
    console.log(err);
  }
});

app.get('/login-admin-page', (req, res) => {
    res.render('admin_login')
})

app.get('/login-admin/:idUsuario/:contraseña', (req,res) => {
  try {

    // const {idUsuario,contraseña} = req.query;

    const idUsuario = req.params.idUsuario;
    const contraseña = req.params.contraseña;

    console.log(idUsuario)
    console.log(contraseña)

    const query = "select idUsuario,contraseña,admin from usuario where idUsuario = @user";
    const request = new mssql.Request();
    request.input('user', mssql.VarChar, idUsuario);

    request.query(query, (err, result) => {
      if (err) {
        res.status(500);
        res.json(err);
      } else {
        const user_data = result.recordset[0];

        let login_response = {login_validation:'0', idUsuario:idUsuario};

        if (user_data && user_data['idUsuario'] == idUsuario && user_data['contraseña'] == hashSHA3_256(contraseña) && user_data['admin'] == 1) {
          login_response.login_validation = '1';
          res.render('admin_panel')
        }
        res.json(login_response);
      }
    });

  } catch (err) {
    res.status(500);
    res.json(err);
  }
})

app.post('/register', (req, res) => {
  try {
    const {idUsuario,nombre,apellido,fechaNacimiento,contraseña,correo,telefono,clave_telefono_pais,pais} = req.body;
    const query = "insert into usuario (idUsuario,nombre,apellido,fechaNacimiento,contraseña,correo,telefono,pais) values (@idUsuario,@nombre,@apellido,@fechaNacimiento,@contraseña,@correo,@telefono,@pais)";

    const request = new mssql.Request();
    request.input('idUsuario', mssql.VarChar, idUsuario);
    request.input('nombre', mssql.VarChar, nombre);
    request.input('apellido', mssql.VarChar, apellido);
    request.input('fechaNacimiento', mssql.Date, fechaNacimiento);
    request.input('contraseña', mssql.VarChar, hashSHA3_256(contraseña));
    request.input('correo', mssql.VarChar, correo);
    request.input('telefono', mssql.VarChar, telefono);
    request.input('pais', mssql.VarChar, pais);

    request.query(query, (err, result) => {
      if (err) {
        if (err.number == 2627) {
          res.json({error:'si', resultado:'Gamertag existente'})
        } else {
          res.json({error:'si', resultado:'Ocurrió un error al registrar su cuenta, inténtelo nuevamente'});
        }
      } else {
        res.json({error:'no', resultado:`Se ha registrado correctamente el usuario ${idUsuario}`});
      }
    });
  } catch (err) {
    res.status(500);
    res.json(err);
  }
});

app.post('/register-score', (req,res) => {
  try {
    const {idPartida, fechaHoraFinal, puntuacionAcumulada} = req.body;

    console.log(idPartida)
    console.log(fechaHoraFinal)
    console.log(puntuacionAcumulada)

    const query = "UPDATE partida SET fechaHoraFinal = @fechaHoraFinal, puntuacionAcumulada = @puntuacionAcumulada WHERE idPartida = @idPartida;"
    
    const request = new mssql.Request();
    request.input('idPartida', mssql.Int, idPartida);
    request.input('fechaHoraFinal', mssql.DateTime, fechaHoraFinal);
    request.input('puntuacionAcumulada', mssql.Int, puntuacionAcumulada);

    request.query(query, (err,result) => {
      res.contentType('text/plain');
      if (err) {
        console.log(err);
        res.status(500);
        res.json(err);
      } else {
        res.json({rowsAffected:result.rowsAffected[0]});
      }
    })

  } catch (err) {
    console.log(err);
    res.status(500);
    res.json(err);
  }
})

app.post('/register-game', (req,res) => {
  try {
    const {idUsuario,fechaHoraInicio} = req.body;
    const query = "insert into partida (idUsuario,fechaHoraInicio) values (@idUsuario,@fechaHoraInicio); select SCOPE_IDENTITY() as 'idPartida';";

    const request = new mssql.Request();
    request.input('idUsuario', mssql.VarChar, idUsuario);
    request.input('fechaHoraInicio', mssql.DateTime, fechaHoraInicio);

    request.query(query, (err,result) => {
      if (err) {
        res.status(500);
        res.json(err);
      } else {
        res.json(result.recordset[0]);
      }
    })

  } catch (err) {
    res.status(500);
    res.json(err);
  }
});


// Página 404
app.use((req, res) => {
  res.type('text/plain').status(404).send('404 - Not Found');
});

app.listen(port,() => {
    console.log('Servidor corriendo en : http://' + ipAddr + ':' + port.toString());
});
