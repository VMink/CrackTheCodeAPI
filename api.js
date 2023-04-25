const express = require('express');
const mysql = require('mysql')

const app = express();
const port = 8080;

app.set('view engine', 'ejs')
app.use(express.static(__dirname+'/public'))

app.get('/', (req,res) => {
    res.render('index')
})

app.get('/login/:user/:pass', (req,res) => {

})

app.listen(port,() => {
    console.log('funciona!!!')
})
