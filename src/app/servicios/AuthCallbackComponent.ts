// auth-callback.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './autenticacion/auth.service';

@Component({
  selector: 'app-auth-callback',
  template: '<p>Iniciando sesión...</p>',
})
export class AuthCallbackComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    console.log('voidinitperfil')
    this.authService.checkRedirectLogin().then(() => {
      // Redirigir a la página deseada después de manejar la autenticación
      this.router.navigate(['/perfil']);
    });
  }
}
