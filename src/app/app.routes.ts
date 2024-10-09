import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { TablaComponent } from './componentes/tabla/tabla.component';
import { NgModule } from '@angular/core';
import { authGuard } from './servicios/guardSesion/auth.guard';
import { PrestamosComponent } from './componentes/prestamos/prestamos.component';
import { AddPrestamoComponent } from './componentes/add-prestamo/add-prestamo.component';
import { AdministrarComponent } from './componentes/administrar/administrar.component';
import { InventarioComponent } from './componentes/inventario/inventario.component';
import { SelecitemComponent } from './componentes/selecitem/selecitem.component';
import { AddInvComponent } from './componentes/add-inv/add-inv.component';
import { NewpassComponent } from './componentes/newpass/newpass.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'perfil', component: TablaComponent},
    { path: 'prestamos', component: PrestamosComponent },
    { path: 'administrar', component: AdministrarComponent },
    { path: 'inventario', component: InventarioComponent},

    { path: 'prueba2', component: SelecitemComponent,canActivate:[authGuard] },

    { path: 'ActualizarContrasena', component: NewpassComponent,canActivate:[authGuard] },

    { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
  ];
  
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }