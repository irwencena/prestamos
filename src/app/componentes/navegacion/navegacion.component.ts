import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-navegacion',
  standalone: true,
  imports: [RouterOutlet,RouterLinkActive,RouterLink,CommonModule],
 
  templateUrl: './navegacion.component.html',
  styleUrl: './navegacion.component.css'
})
export class NavegacionComponent {
  usuario: any = {}
  constructor(private router: Router){ 
    const usuarioData = sessionStorage.getItem('usuario');
    if (usuarioData){
        this.usuario = JSON.parse(usuarioData)
    }}

  prestamos(){
    this.router.navigate(['/prestamos'])
  }
  perfil(){
    this.router.navigate(['/perfil'])
  }
  inv(){
    this.router.navigate(['/inventario'])
  }
  administrar(){ 
    this.router.navigate(['/administrar'])

  }
  salir() {
      sessionStorage.clear();
      this.router.navigate(['/login']);
    }
}
