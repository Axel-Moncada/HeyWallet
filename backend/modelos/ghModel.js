var ghModel = {}
const mongoose =require('mongoose')
const Shema = mongoose.Schema;
var numeral = require('numeral')

const userSchema = new Shema({
    descripcion:String,
    fecha:String,
    cantidad:Number,
    usuario:String
})

const MyModelGH = mongoose.model('ghs',userSchema)


ghModel.agregargh = function(post,callback){
   

    const instancia = new MyModelGH
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


ghModel.Eliminar = function(post,callback){
    
    MyModelGH.findByIdAndDelete(post.id,(error,eliminados)=>{
        if(error){
            return callback({state:false,info:error})
        }
        else{
            return callback({state:true,eliminados})
        }
    })

}

ghModel.Listar = function(post,callback){
    
    MyModelGH.find({usuario:post.id},{descripcion:1,fecha:1,cantidad:1},(error,documentos) => {
        if(error){
            return callback({state:false,info:error})
        }
        else{
            return callback({state:true,documentos})
        }
    })

}
    module.exports.ghModel = ghModel