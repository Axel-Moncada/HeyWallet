import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PeticionService {

  constructor(private http :HttpClient) { }

  Post(url:string,payload:{}){
    let promise = new Promise((resolve,reject) => {
      this.http.post(url,payload)
      .toPromise()
      .then((res:any) =>{
        
      resolve(res)
      })
    })
    return promise
  }


  Get(url:string){

    let promise = new Promise((resolve,reject) => {

      this.http.get(url)
      .toPromise()
      .then((res:any) =>{
       
      resolve(res)
      })
    })
    return promise
  }

  public urlLocal:string = "http://localhost:3500/"

}
