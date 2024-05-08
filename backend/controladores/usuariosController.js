const { request } = require('express')
const nodemon = require('nodemon')
var usuarioModel = require('../modelos/usuarioModel').usuarioModel
var sesionesController = require('../controladores/sesionesController').sesionesController
var usuarioController = {}



usuarioController.iniciarsesion = function(request,response){   
    var post ={
        email:request.body.email,
        pass:request.body.password
    }
    
    
    if(post.email == null | post.email == NaN | post.email == undefined |post.email == 0){
        response.json({mensaje:'Tienes que ingresar un E-mail'})
    }else if(post.pass == null | post.pass == NaN | post.pass == undefined | post.pass == 0){
        response.json({mensaje:'Tienes que ingresar una contraseña'})
    }else{

        usuarioModel.iniciarsesion(post,function(existe) {
            if (existe.state == true){
                
               if(existe.registros[0].estado == '0'){
                response.json({state:false , mensaje: "Activa tu cuenta en el email"})
               }else{              
                request.session.perfil = existe.registros[0].perfil                
                request.session.iduser = existe.registros[0].id               
                response.json({state:true , mensaje: "Usuario logueado correctamente",perfil:existe.registros[0].perfil,id:existe.registros[0].id})
                }
            }else {
                response.json({state:false , mensaje: "Usuario o contraseña invalida"})
            }
        })
    }
    
}

usuarioController.crearusuario = function(request,response){
            
    var post = {
        nombre:request.body.nombre,
        email:request.body.email,
        pass:request.body.password,
        passc:request.body.passconfirmed,
        codigo:Math.floor(Math.random() *(9999 - 1000) + 1000),
        estado:0
    }        
    
                    
            if(post.nombre == null |post.nombre == NaN | post.nombre== undefined | post.nombre == 0){
                response.json({state:false , mensaje:'Tienes que ingresar un nombre'})
            }if(post.email == null | post.email == NaN | post.email == undefined | post.email == 0){
                response.json({state:false , mensaje:'Tienes que ingresar un email'})
            }if(post.pass == null | post.pass == NaN | post.pass == undefined | post.pass == 0){
                response.json({state:false ,mensaje:'Tienes que ingresar un contraseña'})
            }if(post.pass!= post.passc | post.passc == NaN | post.passc == undefined | post.passc == 0 | post.passc ==null){
                response.json({state:false ,mensaje:'No son la misma contraseña'})
            }else{
               
                usuarioModel.buscaremail (post, function (respuesta){

                    console.log(respuesta)
               if(respuesta.state == false){
                 response.json({mensaje:'El email ya esta registrado intenta con otro'})
               }else{ 
                
                usuarioModel.crearusuario(post,function(respuesta2){
                    if(respuesta2.state== true){
                        response.json({state:true,info:"Usuario Creado"})
                        sesionesController.emailVerificacion(post,function(emailenviado){
                            console.log(emailenviado)
                        })

                    }else{
                        response.json({state:false,info:"Error"})
                    }

                }) 
                } 
            })
        
        }

}

usuarioController.listar = function(request,response){
            usuarioModel.listar(request,response)

}


usuarioController.actualizardatos = function(request,response){

    var post = {
        id:request.body.id
    }
    usuarioModel.actualizardatos(post,function(respuesta3){
        response.json(respuesta3)
    })

}

usuarioController.agregardatos = function(request,response){

    var post = {
        id:request.body.id,
        nombre:request.body.nombre,
        edad:request.body.edad,
        ciudad:request.body.ciudad,

        tahorro:request.body.tahorro,
        csalario:request.body.csalario

    }
    usuarioModel.agregardatos(post,function(respuesta3){
        response.json(respuesta3)
    })

}

module.exports.usuariosController = usuarioController

