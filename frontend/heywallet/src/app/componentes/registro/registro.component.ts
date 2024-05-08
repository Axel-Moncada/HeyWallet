import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { MensajesService } from 'src/app/servicios/mensajes.service';
import { PeticionService } from 'src/app/servicios/peticion.service';
import { FormControl } from '@angular/forms';


declare var Swal: any

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  

  

  constructor(private peticion:PeticionService, private msg: MensajesService ) { }


  nombre:string = '';
  email:string = '';
  password:string = '';
  passconfirmed:string = '';
  ngOnInit(): void {
  }
  crearUsuario(){
       var post ={
        host:this.peticion.urlLocal,
        path:'crearusuario',
        payload:{
          nombre:this.nombre,
          email:this.email,
          password:this.password,
          passconfirmed:this.passconfirmed
        }
      }
      this.peticion.Post(post.host + post.path , post.payload).then((res:any) =>{
        
        if(res.state == true){
          this.nombre = '';
          this.email = '';
          this.password = '';
          this.passconfirmed = '';
          Swal.fire({
            icon: 'success',
            title: 'Bienvenido',
            text: 'Activa tu wallet ingresando al link que te llego a tu email',
            footer: 'Estas a un paso de tu nueva billetera digital',
            confirmButtonColor: '#262626'
          })
          
        }else{
         this.nombre = '';
         this.email = '';
         this.password = '';
         this.passconfirmed = '';
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text:   res.mensaje,
            footer: 'Ve y corrijelo para crear tu wallet',
            confirmButtonColor: '#262626'
          })
          
          
          
        }
        
      })

      
    }

    
  }
  

