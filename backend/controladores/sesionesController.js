const { request, response } = require('express')
const nodemon = require('nodemon')
const config = require('../config.js').config
var nodemailer=require('nodemailer')

var sesionesModel = require('../modelos/sesionesModel').sesionesModel
var usuarioModel = require('../modelos/usuarioModel').usuarioModel

var sesionesController = {}


sesionesController.emailVerificacion = function(post,callback){


    var post={
        suemail:post.email,
        codigo:post.codigo,
        estado:post.estado
    }

    var transporter = nodemailer.createTransport({
        host:'smtp.gmail.com',
        port:587,
        secure:false,
        requireTLS:true,
        auth:{
            user:'axelemoncada@gmail.com',
            pass: config.emailpass 
        }
    });

    var mailOptions = {
        from:'axelemoncada@gmail.com',
        to:post.suemail,
        subject:'Codigo de Verificacion - HeyWallet',
        attachments: [{
            filename: 'activar.jpg',
            path: 'D:/DOCUMENTOS/IBERO/proyecto final/hey-wallet/frontend/heywallet/src/assets/images/mailing.jpg',
            cid: 'img' //same cid value as in the html img src
        }],
        html: 
        
        "<div><a href='http://localhost:4200/email/activar/"+ post.suemail+"/"+post.codigo+"'><img src='cid:img' alt='' style ='width:100%'> </a></div>"+ ""




        
    }

    transporter.sendMail(mailOptions,(error,info) =>{

        if(error){
           console.log(error.message)
                return callback ({mensaje:"Error enviar correo"})
        }else{
            return callback ({mensaje:"correo enviado" , info:info})
        }
    })

}


sesionesController.activar = function(request,response){
    var post ={
        email:request.params.email,
        codigo:request.params.codigo
    }

    
    if(post.email == null | post.email == NaN | post.email == undefined |post.email == 0){
        response.json({mensaje:'Tienes que ingresar un E-mail'})
    }else if(post.codigo == null | post.codigo == NaN | post.codigo == undefined | post.codigo == 0){
        response.json({mensaje:'Tienes que ingresar un codigo'})
    }else{
        usuarioModel.activar(post,function(resultado) {            
            if(resultado.state == true){
                response.json({state:true , mensaje:"Cuenta activada"})
            }else{
                response.json({state:false , mensaje:"Error de codigo"})
            }
        })
    }
    

}


sesionesController.activarcuenta = function(request,response){
    var post ={
        email:request.body.email,
        codigo:request.body.codigo
    }

    
    if(post.email == null | post.email == NaN | post.email == undefined |post.email == 0){
        response.json({mensaje:'Tienes que ingresar un E-mail'})
    }else if(post.codigo == null | post.codigo == NaN | post.codigo == undefined | post.codigo == 0){
        response.json({mensaje:'Tienes que ingresar un codigo'})
    }else{
        usuarioModel.activarcuenta(post,function(resultado) {            
            if(resultado.state == true){
                response.json({state:true , mensaje:"Cuenta activada"})
            }else{
                response.json({state:false , mensaje:"Error de codigo"})
            }
        })
    }
    

}




module.exports.sesionesController = sesionesController;

