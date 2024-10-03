import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core'; 

@Injectable({
  providedIn: 'root'
})

export class authGuard implements CanActivate{
  constructor(private router: Router){}

  canActivate(): boolean {
    const user = sessionStorage.getItem('usuario')
    if (user) {
      return true
    } else {
      this.router.navigate(['/login']);
      return false
    }
  }
}