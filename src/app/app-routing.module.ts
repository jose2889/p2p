import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrarOrdenComponent } from './registrar-orden/registrar-orden.component';
import { RegistroViejoComponent } from './registro-viejo/registro-viejo.component';


const routes: Routes = [
  {path: '', component: RegistrarOrdenComponent},
  {path: 'viejo', component: RegistroViejoComponent},
  { path: '**', component: RegistrarOrdenComponent }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
