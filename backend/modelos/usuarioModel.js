var usuarioModel = {}

var listausuarios =[]

const mongoose =require('mongoose')
const Shema = mongoose.Schema;

const userSchema = new Shema({
    nombre:String,
    email:String,
    password:String,
    codigo:String,
    estado:String,
    perfil:Number,
    edad:Number,
    
    tahorro:String,
    csalario:String,
    ciudad:String,
})

const MyModel = mongoose.model('usuarios',userSchema)




usuarioModel.iniciarsesion = function(post,callback){
    
    MyModel.find({email:post.email,password:post.pass}, {id:1,email:1,nombre:1,perfil:1,estado:1},(error,registros) => {
      
        if(error){
            return callback ({state:false , info:error})
        }else{
            if(registros.length > 0 ){
                
                return callback({state:true,registros:registros})
                
            }else{
                return callback({state:false})
            }
            
        }
    })
    
}

usuarioModel.crearusuario = function(post,callback){
   

    const instancia = new MyModel 
    instancia.nombre = post.nombre
    instancia.email = post.email
    instancia.password = post.pass
    instancia.codigo = post.codigo
    instancia.estado = 0
    instancia.perfil = 0



    instancia.save((error,respuesta) =>{
        if (error){            
            return callback ({state:false,info:error})
        }else{
            return  callback ({state:true})              

        }
    })
    // listausuarios.push({nombre:nombre,email:email,password:pass})
   //  response.json({mensaje:'Usuario Creado'})

}

usuarioModel.buscaremail = function (post,callback){
    
    MyModel.find({email:post.email}, {email:1} ,(error,registros) => {
       
        if(error){
            
            return callback({state:false, mensaje:error.message})
        }else{
            console.log(registros)
            if(registros.length > 0 ){
                
                return callback ({state:false})
               
            }else{
                return callback ({state:true})
            }
            
        }


    })
    
    
}




usuarioModel.actualizardatos = function(post,callback){
    
    MyModel.find({_id:post.id},{_id:1,nombre:1,email:1,ciudad:1,edad:1,tahorro:1,csalario:1},(error,documentos) => {
        if(error){
            return callback ({state:false,info:error})
        }
        else{
            
            return callback ({state:true,documentos:documentos})
        }
    })
}


usuarioModel.agregardatos = function(post,callback){

    MyModel.findByIdAndUpdate(post.id,{
        nombre:post.nombre,
        edad:post.edad,
        ciudad:post.ciudad,

        tahorro:post.tahorro,
        csalario:post.csalario,
        },(error,usuariomodificadodatos) => {
            
        if(error){            
            return callback({state:false , info:error})
        }else{
            if(usuariomodificadodatos == null){
                return callback({state:false})
            }else{
                return callback({state:true})
            }
            
          
        }
       
    }
) }
// SERVICIOS DE USUARIO

usuarioModel.activar = function(post,callback){

    MyModel.findOneAndUpdate({email:post.email,codigo:post.codigo},
        {
            estado:1
        }
        ,(error,usuariomodificado) => {
            
        if(error){            
            return callback({state:false , info:error})
        }else{
            if(usuariomodificado == null){
                return callback({state:false})
            }else{
                return callback({state:true})
            }
            
          
        }
       
    }
)}


usuarioModel.activarcuenta = function(post,callback){

    MyModel.findOneAndUpdate({email:post.email,codigo:post.codigo},
        {
            estado:1
        }
        ,(error,usuariomodificado) => {
            
        if(error){            
            return callback({state:false , info:error})
        }else{
            if(usuariomodificado == null){
                return callback({state:false})
            }else{
                return callback({state:true})
            }
            
          
        }
       
    }
)}





module.exports.usuarioModel = usuarioModel