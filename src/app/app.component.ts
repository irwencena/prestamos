import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { NavegacionComponent } from "./componentes/navegacion/navegacion.component";
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule,
    
    RouterOutlet, CommonModule, LoginComponent, NavegacionComponent,

  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  showNav: boolean = false;

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.showNav = !this.router.url.startsWith('/login');
    });
  }
}