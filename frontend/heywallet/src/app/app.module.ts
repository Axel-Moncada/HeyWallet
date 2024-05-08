import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule,HTTP_INTERCEPTORS }from'@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './paginas/index/index.component';
import { MenuComponent } from './componentes/menu/menu.component';
import { HeaderComponent } from './componentes/header/header.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { PreciosComponent } from './paginas/precios/precios.component';
import { ContactenosComponent } from './paginas/contactenos/contactenos.component';
import { IngresarComponent } from './paginas/ingresar/ingresar.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { IniciarSesionComponent } from './componentes/iniciar-sesion/iniciar-sesion.component';
import { MensajesComponent } from './componentes/mensajes/mensajes.component';
import { EmailComponent } from './componentes/email/email.component';
import { MyWalletsComponent } from './paginas/my-wallets/my-wallets.component';
import { FiatComponent } from './paginas/fiat/fiat.component';
import { ErrorComponent } from './paginas/error/error.component';
import { CookieService } from 'ngx-cookie-service';
import { InterceptorService } from './interceptors/interceptor';


@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    MenuComponent,
    HeaderComponent,
    FooterComponent,
    PreciosComponent,
    ContactenosComponent,
    IngresarComponent,
    RegistroComponent,
    IniciarSesionComponent,
    MensajesComponent,
    EmailComponent,
    MyWalletsComponent,
    FiatComponent,
    ErrorComponent,
    
    
  ],
  imports: [
   
    FormsModule,
    BrowserModule, 
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
    
    
  ],
  providers: [
    {
     provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi:true
    },
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
