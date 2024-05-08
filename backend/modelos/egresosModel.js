var egresosModel = {}
const mongoose =require('mongoose')
const Shema = mongoose.Schema;
var numeral = require('numeral')

const userSchema = new Shema({
    descripcion:String,
    fecha:String,
    cantidad:Number,
    usuario:String
})

const MyModelEgresos = mongoose.model('egresos',userSchema)


egresosModel.agregaregreso = function(post,callback){
   

    const instancia = new MyModelEgresos 
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


egresosModel.Eliminar = function(post,callback){
    
    MyModelEgresos.findByIdAndDelete(post.id,(error,eliminados)=>{
        if(error){
            return callback({state:false,info:error})
        }
        else{
            return callback({state:true,eliminados})
        }
    })

}

egresosModel.Listar = function(post,callback){
    
    MyModelEgresos.find({usuario:post.id},{descripcion:1,fecha:1,cantidad:1},(error,documentos) => {
        if(error){
            return callback({state:false,info:error})
        }
        else{
            return callback({state:true,documentos})
        }
    })

}
    module.exports.egresosModel = egresosModel