import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../servicios/autenticacion/auth.service';
import { FormsModule } from '@angular/forms';
import { AlertaloginComponent } from "../alertalogin/alertalogin.component";
import { DocaddService } from '../../servicios/edicion/docadd.service';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule, AlertaloginComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',

})
export class LoginComponent implements OnInit{
  //private auth = getAuth(initializeApp(firebaseConfig));


  constructor(private authService: AuthService, private router: Router, private get: DocaddService) {}
  ClassOnSelec: boolean = false; 
  public avisovisible: boolean = false;
  usuario: any = {};
  ngOnInit(): void {
    console.log('ngoninit')
    const invalidEmail = sessionStorage.getItem('invalidEmail');
    if (invalidEmail) {
        this.avisovisible = true; 
        sessionStorage.removeItem('invalidEmail'); 
    }

    const usuarioData = sessionStorage.getItem('usuario');
      if (usuarioData){
          this.router.navigate(['/perfil'])
      }else {
        return
      }
  }

  cerraraviso(){
    this.avisovisible =false;
  }
  iniciarSesion(email:any, pass: any){
    console.log(email)
    console.log(pass)

    this.get.iniciarSesion(email,pass)
  }
  signInWithGoogle(): void {
    this.ClassOnSelec = true;

    setTimeout(() => {
        this.authService.signInWithGoogle();
    }, 1500);
    setTimeout(() => {
      this.ClassOnSelec = false;
    }, 2500);
  }
}