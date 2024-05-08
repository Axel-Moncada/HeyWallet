const { request } = require('express')
const nodemon = require('nodemon')
var usuarioModel = require('../modelos/usuarioModel').usuarioModel
var sesionesController = require('../controladores/sesionesController').sesionesController
var ingresosModel = require('../modelos/ingresosModel').ingresosModel
var egresosModel = require('../modelos/egresosModel').egresosModel
var ghModel = require('../modelos/ghModel').ghModel
var ahorroModel = require('../modelos/ahorroModel').ahorroModel


var sistemaController = {}



sistemaController.ingresosAgregar= function(request,response){
            
    var post = {
        usuario:request.body.id,
        descripcion:request.body.descripcion,
        fecha:request.body.fecha,
        cantidad:request.body.cantidad,
        
    }        
    
                    
            if(post.descripcion == null |post.descripcion == NaN | post.descripcion== undefined | post.descripcion == 0){
                response.json({state:false , mensaje:'Tienes que ingresar una descripcion'})
            }if(post.fecha == null | post.fecha == NaN | post.fecha == undefined | post.fecha == 0){
                response.json({state:false , mensaje:'Tienes que ingresar una fecha'})
            }if(post.cantidad == null | post.cantidad == NaN | post.cantidad == undefined | post.cantidad == 0){
                response.json({state:false ,mensaje:'Tienes que ingresar una cantidad'})
            }if(post.usuario == null | post.usuario == NaN | post.usuario == undefined | post.usuario == 0){
                response.json({state:false ,mensaje:'Tienes que ingresar un id'})
            }else{
               
                ingresosModel.agregaringreso (post, function (respuesta){
                    if(respuesta.state== true){
                        response.json({state:true,info:"Ingreso Agregado"})
                        
                    }else{
                        response.json({state:false,info:"Error Ingreso"})
                    }

                }) 
                } 
    }
sistemaController.ingresosEliminar= function(request,response){

        var post = {
            id:request.body.id
        }
    
        if(post.id == '' || post.id == undefined || post.id == null){
            response.json({state:false,mensaje:'el campo id es obligatorio'})
            return false
        }
    
        ingresosModel.Eliminar(post,function(respuesta){
            if(respuesta.state == false){
                response.json({state:false,mensaje:'No se pudo Eliminar este Elemento'})
            }
            else{
                response.json({state:true,mensaje:'Se Elimino Correctamente'})
            }
        })
    
    }
sistemaController.ingresosListar= function(request,response){

        var post = {
            id:request.body.id            
        }
    
       
        ingresosModel.Listar(post,function(respuesta){
            response.json(respuesta)            
        })
    
    }

    //EGRESOS

    
sistemaController.egresosAgregar= function(request,response){
            
    var post = {
        usuario:request.body.id,
        descripcion:request.body.descripcion,
        fecha:request.body.fecha,
        cantidad:request.body.cantidad,
        
    }        
    
                    
            if(post.descripcion == null |post.descripcion == NaN | post.descripcion== undefined | post.descripcion == 0){
                response.json({state:false , mensaje:'Tienes que ingresar una descripcion'})
            }if(post.fecha == null | post.fecha == NaN | post.fecha == undefined | post.fecha == 0){
                response.json({state:false , mensaje:'Tienes que ingresar una fecha'})
            }if(post.cantidad == null | post.cantidad == NaN | post.cantidad == undefined | post.cantidad == 0){
                response.json({state:false ,mensaje:'Tienes que ingresar una cantidad'})
            }if(post.usuario == null | post.usuario == NaN | post.usuario == undefined | post.usuario == 0){
                response.json({state:false ,mensaje:'Tienes que ingresar un id'})
            }else{
               
                egresosModel.agregaregreso (post, function (respuesta){
                    if(respuesta.state== true){
                        response.json({state:true,info:"Egreso Agregado"})
                        
                    }else{
                        response.json({state:false,info:"Error Ingreso"})
                    }

                }) 
                } 
    }
sistemaController.egresosEliminar= function(request,response){

        var post = {
            id:request.body.id
        }
    
        if(post.id == '' || post.id == undefined || post.id == null){
            response.json({state:false,mensaje:'el campo id es obligatorio'})
            return false
        }
    
        egresosModel.Eliminar(post,function(respuesta){
            if(respuesta.state == false){
                response.json({state:false,mensaje:'No se pudo Eliminar este Elemento'})
            }
            else{
                response.json({state:true,mensaje:'Se Elimino Correctamente'})
            }
        })
    
    }
sistemaController.egresosListar= function(request,response){

        var post = {
            id:request.body.id            
        }
    
       
        egresosModel.Listar(post,function(respuesta){
            response.json(respuesta)            
        })
    
    }

    
    //EGRESOS

    
sistemaController.ghAgregar= function(request,response){
            
    var post = {
        usuario:request.body.id,
        descripcion:request.body.descripcion,
        fecha:request.body.fecha,
        cantidad:request.body.cantidad,
        
    }        
    
                    
            if(post.descripcion == null |post.descripcion == NaN | post.descripcion== undefined | post.descripcion == 0){
                response.json({state:false , mensaje:'Tienes que ingresar una descripcion'})
            }if(post.fecha == null | post.fecha == NaN | post.fecha == undefined | post.fecha == 0){
                response.json({state:false , mensaje:'Tienes que ingresar una fecha'})
            }if(post.cantidad == null | post.cantidad == NaN | post.cantidad == undefined | post.cantidad == 0){
                response.json({state:false ,mensaje:'Tienes que ingresar una cantidad'})
            }if(post.usuario == null | post.usuario == NaN | post.usuario == undefined | post.usuario == 0){
                response.json({state:false ,mensaje:'Tienes que ingresar un id'})
            }else{
               
                ghModel.agregargh (post, function (respuesta){
                    if(respuesta.state== true){
                        response.json({state:true,info:"Egreso Agregado"})
                        
                    }else{
                        response.json({state:false,info:"Error Ingreso"})
                    }

                }) 
                } 
    }
sistemaController.ghEliminar= function(request,response){

        var post = {
            id:request.body.id
        }
    
        if(post.id == '' || post.id == undefined || post.id == null){
            response.json({state:false,mensaje:'el campo id es obligatorio'})
            return false
        }
    
        ghModel.Eliminar(post,function(respuesta){
            if(respuesta.state == false){
                response.json({state:false,mensaje:'No se pudo Eliminar este Elemento'})
            }
            else{
                response.json({state:true,mensaje:'Se Elimino Correctamente'})
            }
        })
    
    }
sistemaController.ghListar= function(request,response){

        var post = {
            id:request.body.id            
        }
    
       
        ghModel.Listar(post,function(respuesta){
            response.json(respuesta)            
        })
    
    }

    //AHORRO

    
sistemaController.ahorroAgregar= function(request,response){
            
    var post = {
        usuario:request.body.id,
        descripcion:request.body.descripcion,
        fecha:request.body.fecha,
        cantidad:request.body.cantidad,
        
    }        
    
                    
            if(post.descripcion == null |post.descripcion == NaN | post.descripcion== undefined | post.descripcion == 0){
                response.json({state:false , mensaje:'Tienes que ingresar una descripcion'})
            }if(post.fecha == null | post.fecha == NaN | post.fecha == undefined | post.fecha == 0){
                response.json({state:false , mensaje:'Tienes que ingresar una fecha'})
            }if(post.cantidad == null | post.cantidad == NaN | post.cantidad == undefined | post.cantidad == 0){
                response.json({state:false ,mensaje:'Tienes que ingresar una cantidad'})
            }if(post.usuario == null | post.usuario == NaN | post.usuario == undefined | post.usuario == 0){
                response.json({state:false ,mensaje:'Tienes que ingresar un id'})
            }else{
               
                ahorroModel.agregarahorro (post, function (respuesta){
                    if(respuesta.state== true){
                        response.json({state:true,info:"Ahorro Agregado"})
                        
                    }else{
                        response.json({state:false,info:"Error Ingreso"})
                    }

                }) 
                } 
    }
sistemaController.ahorroEliminar= function(request,response){

        var post = {
            id:request.body.id
        }
    
        if(post.id == '' || post.id == undefined || post.id == null){
            response.json({state:false,mensaje:'el campo id es obligatorio'})
            return false
        }
    
        ahorroModel.Eliminar(post,function(respuesta){
            if(respuesta.state == false){
                response.json({state:false,mensaje:'No se pudo Eliminar este Elemento'})
            }
            else{
                response.json({state:true,mensaje:'Se Elimino Correctamente'})
            }
        })
    
    }
sistemaController.ahorroListar= function(request,response){

        var post = {
            id:request.body.id            
        }
    
       
        ahorroModel.Listar(post,function(respuesta){
            response.json(respuesta)            
        })
    
    }


module.exports.sistemaController = sistemaController

