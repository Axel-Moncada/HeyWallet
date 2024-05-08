import { Component, Input, OnInit } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';

import { PeticionService } from 'src/app/servicios/peticion.service';
declare var Swal: any

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css']
})
export class IniciarSesionComponent implements OnInit {
  
  constructor(private peticion:PeticionService , private router: Router ) { }

  email:string='';
  password:string='';
  id:string='';

  
  

  ngOnInit(): void {
   
  }

 

  iniciarSesion(){
    var post ={
      host:this.peticion.urlLocal,
      path:'iniciarSesion',
      payload:{
        email:this.email,
        password:this.password
      }
    }
    this.peticion.Post(post.host + post.path , post.payload).then((res:any) =>{
     
        
        if(res.state == true){
         this.id=res.id;
          this.email = '';
         this.password = '';

        localStorage.setItem('id',this.id)
          Swal.fire({
            icon: 'success',
            title: 'Bienvenido',
            text: res.mensaje,
            footer: 'Bienvenido de nuevo',
            confirmButtonColor: '#262626'
          })     

          this.router.navigateByUrl('/wallet/my-wallet');
 
        }else{

         
         this.email = '';
         this.password = '';
         
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text:   res.mensaje,
            footer: 'Ve y corrijelo para crear tu wallet',
            confirmButtonColor: '#262626'
          })
        

          
        

    }} )
  }
 
}
