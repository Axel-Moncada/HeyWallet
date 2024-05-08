const { request, response } = require('express')
const session = require('express-session')

var usuarios = require('./controladores/usuariosController').usuariosController
var sesiones = require('./controladores/sesionesController').sesionesController
var sistema = require('./controladores/sistemaController').sistemaController


var validarperfil=function(request,response,next){
    if(request.session.perfil == 0){
        next ()
    }else{
        response.json({mesnaje:"sin permisos"})
    }
}


//USUARIOS

app.post('/iniciarSesion',function(request,response){
    usuarios.iniciarsesion(request,response)
    
})

app.post('/crearusuario',function(request,response){
    usuarios.crearusuario(request,response)
})

app.post('/listar',function(request,response){
    usuarios.listar(request,response)
})


//EMAIL


app.post('/email/verificacion',function(request,response){
    sesiones.emailVerificacion(request,response)
})
app.post('/email/activarcuenta',function(request,response){
    sesiones.activarcuenta(request,response)
})
app.get('/email/activar/:email/:codigo',function(request,response){
    sesiones.activar(request,response)
})



// status

app.post('/status',function(request,response){   
    response.json({perfil:request.session.perfil,data:'asdasdasd', id:request.session.iduser})
})

app.post('/logout',function(request,response){
    request.session.destroy()
    response.json({state:true, mensaje:"sesion cerrada"})
})


app.post('/actualizardatos',function(request,response){
    usuarios.actualizardatos(request,response)
})

app.post('/agregardatos',function(request,response){
    usuarios.agregardatos(request,response)
})

//logout

// SISTEMAS DE FUNCIONALIDADES

//INGRESOS
    app.post('/ingresos/agregar',function(request,response){
        sistema.ingresosAgregar(request,response)
    })

    app.post('/ingresos/eliminar',function(request,response){
        sistema.ingresosEliminar(request,response)
    })

    app.post('/ingresos/listar',function(request,response){
        sistema.ingresosListar(request,response)
    })


//EGRESOS
    app.post('/egresos/agregar',function(request,response){
        sistema.egresosAgregar(request,response)
    })

    app.post('/egresos/eliminar',function(request,response){
        sistema.egresosEliminar(request,response)
    })

    app.post('/egresos/listar',function(request,response){
        sistema.egresosListar(request,response)
    })

//GH
    app.post('/gh/agregar',function(request,response){
        sistema.ghAgregar(request,response)
    })

    app.post('/gh/eliminar',function(request,response){
        sistema.ghEliminar(request,response)
    })

    app.post('/gh/listar',function(request,response){
        sistema.ghListar(request,response)
    })

//AHORRO
    app.post('/ahorro/agregar',function(request,response){
        sistema.ahorroAgregar(request,response)
    })

    app.post('/ahorro/eliminar',function(request,response){
        sistema.ahorroEliminar(request,response)
    })

    app.post('/ahorro/listar',function(request,response){
        sistema.ahorroListar(request,response)
    })