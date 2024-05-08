import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmailComponent } from './componentes/email/email.component';
import { ContactenosComponent } from './paginas/contactenos/contactenos.component';
import { ErrorComponent } from './paginas/error/error.component';
import { FiatComponent } from './paginas/fiat/fiat.component';
import { IndexComponent } from './paginas/index/index.component';
import { IngresarComponent } from './paginas/ingresar/ingresar.component';
import { MyWalletsComponent } from './paginas/my-wallets/my-wallets.component';
import { PreciosComponent } from './paginas/precios/precios.component';

const routes: Routes = [
  { path: '',component:IndexComponent},
  { path: 'precios',component:PreciosComponent},
  { path: 'contactenos',component:ContactenosComponent},
  { path: 'ingresar',component:IngresarComponent},
  { path: 'inicio',component:IndexComponent},
  { path: 'wallet/my-wallet',component:MyWalletsComponent},
  { path: 'wallet/my-wallet/fiat',component:FiatComponent},
  { path: 'email/activar/:email/:codigo',component:EmailComponent},
  { path: '**',component:ErrorComponent}
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
