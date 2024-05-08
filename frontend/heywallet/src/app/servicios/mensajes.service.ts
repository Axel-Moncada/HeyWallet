import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MensajesService {

  constructor() { }


  public msgDatos:any[] =[
    
  ]

  AgregarMensaje(tipox:string,mensajex:string,tiempo:number){

    this.msgDatos.push({tipo:tipox,mensaje:mensajex})

    this.eliminarMensaje(tiempo)
  }


  eliminarMensaje(tiempo:number){
    setTimeout(() => {
      
      this.msgDatos.splice(0,1)
    }, tiempo);
  }



}
