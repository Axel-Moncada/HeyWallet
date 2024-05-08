import { Component, Input, OnInit, ViewChild} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';
import { IniciarSesionComponent } from 'src/app/componentes/iniciar-sesion/iniciar-sesion.component';




import { PeticionService } from 'src/app/servicios/peticion.service';
declare var Swal: any

@Component({
  selector: 'app-fiat',
  templateUrl: './fiat.component.html',
  styleUrls: ['./fiat.component.css']
})
export class FiatComponent implements OnInit {
 
  
  
  constructor(private peticion:PeticionService , private router: Router ) { 

    
  }
  
  

   id:any=localStorage.getItem('id')
  descripcionIngreso:string='';
  fechaIngreso:string='';
  cantidadIngreso:string='';

  
  descripcionEgreso:string='';
  fechaEgreso:string='';
  cantidadEgreso:string='';

  descripcionGH:string='';
  fechaGH:string='';
  cantidadGH:string='';

  descripcionAHO:string='';
  fechaAHO:string='';
  cantidadAHO:string='';

  totalingresos:number=0;
  totalegresos:number=0;
  totalegresosf:number=0;
  totalegresosgh:number=0;
  totalegresosfinal:number=0;
  totalahorros:number=0;


  calcahorro:number=0;
  calcahorrof:number=0;

  
  calcgasto:number=0;
  calcgastof:number=0;
  calcgastofi:number=0;

  color:any=''
  resid:any=''
  idUser:any=''
  localid:String=''
  idsession:Number=0
 
  

  ngOnInit(): void {    
    
    
    this.leerid()  
    this.status()  
    this.mostrarIngreso()
    this.mostrarEgreso()
    this.mostrarGH()
    this.mostrarAHO() 
    this.totalfunction()
    

    
  }
  

  

  datosingreso:any[] =[]
  datosegreso:any[] =[]
  datosgh:any[] =[]
  datosaho:any[] =[]


  totaldineropositivo:number= 0
  totaldinero:number= 0
 

  leerid(){   
    var post ={
      host:this.peticion.urlLocal,
      path:'status',
      payload:{
        
      }
    }
    this.peticion.Post(post.host + post.path , post.payload).then((res:any) =>{
      
      function idUsuario (res) {
         var localid=res.id
         return localid
      }
    })
    
  }
  status(){
     
    if (this.id == null){
      this.idsession=0    
      window.location.reload();      
    }else{
      
      this.idsession=1
    }

}
  
  

  
  

  agregarIngreso(){
    this.leerid()
    console.log('este es id agregar iingr', this.id)
    var post ={
      host:this.peticion.urlLocal,
      path:'ingresos/agregar',
      payload:{
        id:this.id,
        descripcion:this.descripcionIngreso,
        fecha:this.fechaIngreso,
        cantidad:this.cantidadIngreso,
      }
      
    }
    this.peticion.Post(post.host + post.path , post.payload).then((res:any) =>{
     
        
        if(res.state == true){
          Swal.fire({
            icon: 'success',
            title: 'Ingreso agregado',
            text: res.mensaje,
            footer: 'Excelente has realizado un nuevo ingreso',
            confirmButtonColor: '#262626'
            
          })     

          this.mostrarIngreso()
 
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text:   res.mensaje,
            footer: 'Algo paso',
            confirmButtonColor: '#262626'
          })  
    }} )
  }

  mostrarIngreso(){
    console.log('este es id agregar iingr', this.id)

    var post ={
      host:this.peticion.urlLocal,
      path:'ingresos/listar',
      payload:{
        id:this.id
      }
    }
    this.peticion.Post(post.host + post.path , post.payload).then((res:any) =>{
     
      this.datosingreso=res.documentos   
      this.totalingresos = 0 
      
      for (let a = 0; a < res.documentos.length; a++) {
       

       this.totalingresos= this.totalingresos+ res.documentos[a].cantidad
        
      }
      this.calcularahorro()
      this.totalfunction()
       
    })
  }

  eliminarIngreso(idborrar){
    this.leerid()
   
    var post ={
      host:this.peticion.urlLocal,
      path:'ingresos/eliminar',
      payload:{
        id:idborrar,
       }
    }
    this.peticion.Post(post.host + post.path , post.payload).then((res:any) =>{
     
        
        if(res.state == true){
          Swal.fire({
            icon: 'success',
            title: 'Ingreso Eliminado',
            text: res.mensaje,
            footer: 'Listo, eliminaste un registro',
            confirmButtonColor: '#262626'
            
          })     

          this.mostrarIngreso()
 
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text:   res.mensaje,
            footer: 'Algo paso',
            confirmButtonColor: '#262626'
          })  
    }} )
  }

  // EGRESOS

  agregarEgreso(){
    this.leerid()
    var post ={
      host:this.peticion.urlLocal,
      path:'egresos/agregar',
      payload:{
        id:this.id,
        descripcion:this.descripcionEgreso,
        fecha:this.fechaEgreso,
        cantidad:this.cantidadEgreso,
      }
    }
    this.peticion.Post(post.host + post.path , post.payload).then((res:any) =>{
     
        
        if(res.state == true){
          Swal.fire({
            icon: 'success',
            title: 'Egreso agregado',
            text: res.mensaje,
            footer: 'Excelente has realizado un nuevo egreso',
            confirmButtonColor: '#262626'
            
          })     

          this.mostrarEgreso()
 
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text:   res.mensaje,
            footer: 'Algo paso',
            confirmButtonColor: '#262626'
          })  
    }} )
  }

  mostrarEgreso(){
    this.leerid()
    var post ={
      host:this.peticion.urlLocal,
      path:'egresos/listar',
      payload:{
        id:this.id
      }
    }
    this.peticion.Post(post.host + post.path , post.payload).then((res:any) =>{
     
       
     
      this.datosegreso=res.documentos
      this.totalegresos = 0 
      
      for (let a = 0; a < res.documentos.length; a++) {
       
        
       this.totalegresos= this.totalegresos + res.documentos[a].cantidad
        
      }

      this.totalegresosfunc()
      this.calculargastos()
      this.totalfunction()
       
      
       
    })
  }

  eliminarEgreso(idborrar){
    this.leerid()
   
    var post ={
      host:this.peticion.urlLocal,
      path:'egresos/eliminar',
      payload:{
        id:idborrar,
       }
    }
    this.peticion.Post(post.host + post.path , post.payload).then((res:any) =>{
     
        
        if(res.state == true){
          Swal.fire({
            icon: 'success',
            title: 'Egreso Eliminado',
            text: res.mensaje,
            footer: 'Listo, eliminaste un registro',
            confirmButtonColor: '#262626'
            
          })     

          this.mostrarEgreso()
 
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text:   res.mensaje,
            footer: 'Algo paso',
            confirmButtonColor: '#262626'
          })  
    }} )
  }


  // GH
  agregarGH(){
    this.leerid()
    var post ={
      host:this.peticion.urlLocal,
      path:'gh/agregar',
      payload:{
        id:this.id,
        descripcion:this.descripcionGH,
        fecha:this.fechaGH,
        cantidad:this.cantidadGH,
      }
    }
    this.peticion.Post(post.host + post.path , post.payload).then((res:any) =>{
     
        
        if(res.state == true){
          Swal.fire({
            icon: 'success',
            title: 'Gasto Hormiga agregado',
            text: res.mensaje,
            footer: 'Excelente has realizado un nuevo ingreso',
            confirmButtonColor: '#262626'
            
          })     

          this.mostrarGH()
 
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text:   res.mensaje,
            footer: 'Algo paso',
            confirmButtonColor: '#262626'
          })  
    }} )
  }

  mostrarGH(){
    this.leerid()
    var post ={
      host:this.peticion.urlLocal,
      path:'gh/listar',
      payload:{
        id:this.id
      }
    }
    this.peticion.Post(post.host + post.path , post.payload).then((res:any) =>{
     
       
     
      this.datosgh=res.documentos     
      this.totalegresosgh = 0 
      
      for (let a = 0; a < res.documentos.length; a++) {     
       this.totalegresosgh= this.totalegresosgh + res.documentos[a].cantidad
       
      }

      this.totalegresosfunc()
      this.calculargastos()
      this.totalfunction()


      
       
    })
  }

  eliminarGH(idborrar){
    this.leerid()
   
    var post ={
      host:this.peticion.urlLocal,
      path:'gh/eliminar',
      payload:{
        id:idborrar,
       }
    }
    this.peticion.Post(post.host + post.path , post.payload).then((res:any) =>{
     
        
        if(res.state == true){
          Swal.fire({
            icon: 'success',
            title: 'Ingreso Eliminado',
            text: res.mensaje,
            footer: 'Listo, eliminaste un registro',
            confirmButtonColor: '#262626'
            
          })     

          this.mostrarGH()
 
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text:   res.mensaje,
            footer: 'Algo paso',
            confirmButtonColor: '#262626'
          })  
    }} )
  }

  // AHORRO
  agregarAHO(){
    this.leerid()
    var post ={
      host:this.peticion.urlLocal,
      path:'ahorro/agregar',
      payload:{
        id:this.id,
        descripcion:this.descripcionAHO,
        fecha:this.fechaAHO,
        cantidad:this.cantidadAHO,
      }
    }
    this.peticion.Post(post.host + post.path , post.payload).then((res:any) =>{
     
        
        if(res.state == true){
          Swal.fire({
            icon: 'success',
            title: 'Ahorro agregado',
            text: res.mensaje,
            footer: 'Excelente has realizado un nuevo ahorro',
            confirmButtonColor: '#262626'
            
          })     

          this.mostrarAHO()
          
 
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text:   res.mensaje,
            footer: 'Algo paso',
            confirmButtonColor: '#262626'
          })  
    }} )
  }

  mostrarAHO(){
    this.leerid()
    var post ={
      host:this.peticion.urlLocal,
      path:'ahorro/listar',
      payload:{
        id:this.id
      }
    }
    this.peticion.Post(post.host + post.path , post.payload).then((res:any) =>{
     
       
     
      this.datosaho=res.documentos
      this.totalahorros = 0 
      
      for (let a = 0; a < res.documentos.length; a++) {       
        
       this.totalahorros= this.totalahorros + res.documentos[a].cantidad
        
      }
      this.colorahorro()   
      this.totalfunction() 
       
    })
  }

  eliminarAHO(idborrar){
    this.leerid()
   
    var post ={
      host:this.peticion.urlLocal,
      path:'ahorro/eliminar',
      payload:{
        id:idborrar,
       }
    }
    this.peticion.Post(post.host + post.path , post.payload).then((res:any) =>{
     
        
        if(res.state == true){
          Swal.fire({
            icon: 'success',
            title: 'Ahorro Eliminado',
            text: res.mensaje,
            footer: 'Listo, eliminaste un registro',
            confirmButtonColor: '#262626'
            
          })     

          this.mostrarAHO()
 
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text:   res.mensaje,
            footer: 'Algo paso',
            confirmButtonColor: '#262626'
          })  
    }} )
  }


  //FUNCIONALIDADES 
  totalegresosfunc(){
    this.totalegresosf = this.totalegresosgh + this.totalegresos
    this.totalfunction()
  }


  calcularahorro(){
    this.calcahorro= this.totalingresos * 30 
    this.calcahorrof=this.calcahorro / 100
  }


  calculargastos(){
    this.calcgasto= this.totalegresosf * 30
    this.calcgastof= this.calcgasto / 100


    this.calcgastofi = this.calcgastof - this.totalegresosgh
  }

  colorahorro(){
    if (this.calcahorrof <= this.totalahorros){
        this.color= 'fondoverde'
    }else{
      this.color=''
    }
  }


  totalfunction(){
    this.totaldineropositivo = this.totalingresos + this.totalahorros

    this.totaldinero=this.totaldineropositivo- this.totalegresos
  }
}
