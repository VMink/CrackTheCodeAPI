const express = require('express');

const app = express();
const port = 8080;
const ipAddr = 'localhost';

app.set('view engine', 'ejs')
app.use(express.static(__dirname+'/public'))

app.get('/',(req,res)=>{
    res.render('index')
})

// app.post('login/:user/:pass')

app.listen(port,()=>{console.log('funciona!!!')})

//HUMBERTO SE LA TRAGA ENTERA
//HUMBERTO SE LA TRAGA ENTERA
//HUMBERTO SE LA TRAGA ENTERA
//HUMBERTO SE LA TRAGA ENTERA
//HUMBERTO SE LA TRAGA ENTERA
//HUMBERTO SE LA TRAGA ENTERA
//HUMBERTO SE LA TRAGA ENTERA
//HUMBERTO SE LA TRAGA ENTERA
