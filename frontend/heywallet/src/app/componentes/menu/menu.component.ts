import { Component, OnInit } from '@angular/core';
import { PeticionService } from 'src/app/servicios/peticion.service';
import {CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';
declare var Swal: any

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor( private peticion:PeticionService , private router: Router) { }

  ngOnInit(): void {
   

    this.status()
    this.actualizardatos()
  }

    idsession:any=''
    indicativo:Number=0
    email:any=''

    nombreactual:any=''
    edadactual:any=''
    ciudadactual:any=''
    tahorroactual:any=''
    csalarioactual:any=''
    


    nombrenuevo:any=''
    edadnuevo:any=''
    ciudadnuevo:any=''
    tahorronuevo:any=''
    csalarionuevo:any=''
    


    nombre:any=''
    emailuser:any=''
    edad:any=''
    ciudad:any=''
    

    status(){
     
          if (localStorage.getItem('id') == null){
            this.indicativo=0            
          }else{
            this.indicativo=1
            
      }
    }
      logout(){
        window.localStorage.removeItem('id');
  
      }

      actualizardatos(){   
        var post ={
          host:this.peticion.urlLocal,
          path:'actualizardatos',
          payload:{
            id:localStorage.getItem('id')
          }
        }
        this.peticion.Post(post.host + post.path , post.payload).then((res:any) =>{
          
          console.log(res.documentos)
          this.nombreactual = res.documentos[0].nombre,
          this.emailuser = res.documentos[0].email,
          this.edadactual = res.documentos[0].edad,
          this.ciudadactual = res.documentos[0].ciudad
          this.tahorroactual = res.documentos[0].tahorro
          this.csalarioactual = res.documentos[0].csalario
        })
        
      }

      agregardatos(){   
        var post ={
          host:this.peticion.urlLocal,
          path:'agregardatos',
          payload:{
            id:localStorage.getItem('id'),
            nombre:this.nombrenuevo,
            edad:this.edadnuevo,
            ciudad:this.ciudadnuevo,
            tahorro:this.tahorronuevo,
            csalario:this.csalarionuevo,
          }
        }
        this.peticion.Post(post.host + post.path , post.payload).then((res:any) =>{
          
          Swal.fire({
            icon: 'success',
            title: 'Dstos actualizados ',
            text: res.mensaje,
            
            confirmButtonColor: '#262626'
          })     
          this.actualizardatos()
          
          
          
        })
        
      }
    
  }

   

