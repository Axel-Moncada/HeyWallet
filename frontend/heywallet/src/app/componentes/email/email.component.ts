import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import {CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';


import { PeticionService } from 'src/app/servicios/peticion.service';
declare var Swal: any

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {

  constructor( private peticion:PeticionService , private actroute: ActivatedRoute , private router: Router ) { }

  email:string='';
  codigo:string=''
  ngOnInit(): void {

    this.email = this.actroute.snapshot.params['email']
    this.codigo = this.actroute.snapshot.params['codigo']
   
  }


  activar(){
      var post ={
        host:this.peticion.urlLocal,
        path:'email/activarcuenta',
        payload:{
          email:this.email,
          codigo:this.codigo
        }
      }
      this.peticion.Post(post.host + post.path , post.payload).then((res:any) =>{
       
          
          if(res.state == true){
              Swal.fire({
              icon: 'success',
              title: 'Activada',
              text: res.mensaje,
              footer: 'Esta lista tu wallet ingresa a tu cuenta',
              confirmButtonColor: '#262626'
            })     
  
            this.router.navigateByUrl('/ingresar');
   
          }else{
  
           
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
