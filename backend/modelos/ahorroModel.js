var ahorroModel = {}
const mongoose =require('mongoose')
const Shema = mongoose.Schema;
var numeral = require('numeral')

const userSchema = new Shema({
    descripcion:String,
    fecha:String,
    cantidad:Number,
    usuario:String
})

const MyModelAhorro = mongoose.model('ahorro',userSchema)


ahorroModel.agregarahorro = function(post,callback){
   

    const instancia = new MyModelAhorro 
    instancia.descripcion = post.descripcion
    instancia.fecha = post.fecha
    instancia.cantidad = post.cantidad
    instancia.usuario = post.usuario
 



    instancia.save((error,respuesta) =>{
        if (error){            
            return callback ({state:false,info:error})
        }else{
            return  callback ({state:true})              

        }
    })

}


ahorroModel.Eliminar = function(post,callback){
    
    MyModelAhorro.findByIdAndDelete(post.id,(error,eliminados)=>{
        if(error){
            return callback({state:false,info:error})
        }
        else{
            return callback({state:true,eliminados})
        }
    })

}

ahorroModel.Listar = function(post,callback){
    
    MyModelAhorro.find({usuario:post.id},{descripcion:1,fecha:1,cantidad:1},(error,documentos) => {
        if(error){
            return callback({state:false,info:error})
        }
        else{
            return callback({state:true,documentos})
        }
    })

}
    module.exports.ahorroModel = ahorroModel