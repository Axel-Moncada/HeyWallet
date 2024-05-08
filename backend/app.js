var express = require('express')
var config = require('./config.js').config
global.app = express();
const mongoose = require('mongoose');

app.all('*',function(req, res, next){
    res.header("Access-Control-Allow-Credentials", "true");
       next();
});

mongoose.connect('mongodb://127.0.0.1:27017/'+config.db,{useNewUrlParser:true,useUnifiedTopology:true},(error,respuesta) => {
    if(error){
        console.log(error)
    }else{
        console.log('Conexion a mongo correctamente')
    }
})

var bodyParser = require('body-parser')
const { json } = require('express')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))



// Se llema al cors
var cors = require('cors')

app.use(cors({
  origin: function(origin, callback){
    console.log(origin)
    if(!origin) return callback(null, true);
    if(config.EnabledCors == true){
        if(config.origins.indexOf(origin) === -1){
            return callback('error cors', false);
        } 
    }

    return callback(null, true);

  }

}));



var session= require("express-session")({
    secret:config.sesionsecret,
    resave:true,
    saveUninitialized:true,    
    cookie:{ path:'/',httpOnly:true,
    maxAge:300000
},
    name:'myapp',
    rolling:true,
    
})

app.use(session)


require('./rutas.js')




app.use('/',express.static(__dirname + '/pagina'))
app.listen(config.puerto,function (){
    console.log("hola mundo desde el puerto",config.puerto  )
})