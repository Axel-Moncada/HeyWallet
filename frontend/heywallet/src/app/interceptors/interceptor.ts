import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor() { }
  requestOptions:any = {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    


    // const headers = new HttpHeaders({
    //   "Content-Type": "application/json;charset=UTF-8"
    // })
    
   
    if(req.method == "GET"){
      this.requestOptions = {
        headers: new HttpHeaders({
          "Content-Type": "application/json;charset=UTF-8"
        }),
        withCredentials: false
       };
    }
    else{
      this.requestOptions = {
        headers: new HttpHeaders({
        }),
        withCredentials: true
       };
    }



    const reqClone = req.clone(this.requestOptions);

    // const request2 = reqClone.clone({
    //   withCredentials: true
    // });

    
    return next.handle(reqClone)


  }


}

