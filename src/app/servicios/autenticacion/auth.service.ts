import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithRedirect, getRedirectResult, setPersistence, browserSessionPersistence, browserLocalPersistence } from 'firebase/auth';
import { firebaseConfig } from '../firebase-config';
import { DocaddService } from '../edicion/docadd.service';
import { Firestore } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService  {
  private auth = getAuth(initializeApp(firebaseConfig));

  constructor(private router: Router, private docadd: DocaddService) {}
 

  signInWithGoogle(): void {
    console.log('INTENTANDO INICIAR SESION:');
    const provider = new GoogleAuthProvider();
   
    setPersistence(this.auth, browserLocalPersistence)
    .then(() => {
      const isMobile = /Android|iPhone|iPad|Chrome|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent);

      if (isMobile) {
        signInWithPopup(this.auth, provider)      // Usa popup en escritorio
          .then((result) => this.handleLogin(result.user))
          .catch((error) => {
            console.error('Error de autenticación:', error);
          }); 
         
        // Redirecciona en dispositivos móviles
      } else {
        signInWithPopup(this.auth, provider)      // Usa popup en escritorio
          .then((result) => this.handleLogin(result.user))
          .catch((error) => {
            console.error('Error de autenticación:', error);
          });
      }
    })
    .catch((error) => {
      console.error('Error al configurar la persistencia:', error);
    });
}
  

private handleLogin(user: any): void {
  console.log('Datos recibidos en handleLogin:', user);

  const correo = user.email;
  let display = user.displayName;
  const regex = /\((.*?)\)\s*(.*?)\s*\((.*?)\)/;
  const matches = display?.match(regex);

  // Regex para detectar si es profesor (formato: string.xx@queretaro.tecnm.mx)
  const profesorRegex = /^[a-zA-Z]+\.[a-zA-Z]{2}@queretaro\.tecnm\.mx$/;
  
  let nivel = '';

  if (profesorRegex.test(correo)) {
    nivel = 'Docente';
    let userdata = {
      nombre: user.displayName,
      carrera: 'Docente',
      nocontrol: 'x',
      email: correo,
      nivel: nivel, // Agregar nivel como maestro o alumno
    };

    console.log('Es un maestro.');
    
    sessionStorage.setItem('usuario', JSON.stringify(userdata));

    this.docadd.useradd(userdata);
    this.router.navigate(['/perfil']);

  } else if (matches && matches.length === 4) {
    const carrera = matches[1];
    const nombre = matches[2];
    const control = matches[3];
    
        nivel = 'Docente';

    console.log('Nombre:', nombre);
    console.log('Carrera:', carrera);
    console.log('No. de control:', control);
    console.log('Correo:', correo);
    console.log('Nivel:', nivel);
    let userdata: { 
      nombre: any; 
      carrera: any; 
      nocontrol: any; 
      email: any; 
      nivel: string; 
      password: any; 
    };

    userdata = {
      nombre: nombre,
      carrera: carrera,
      nocontrol: control,
      email: correo,
      nivel: nivel,
      password:false,
    };

    

    sessionStorage.setItem('usuario', JSON.stringify(userdata));

    this.docadd.verificarYAgregarUsuario(userdata);
    this.docadd.getpass(control).then(pass => {
      console.log('pass:', pass);

      if (pass === false || null){
        userdata.password = false;
      sessionStorage.setItem('usuario', JSON.stringify(userdata));
      }else{
        userdata.password = pass;
      sessionStorage.setItem('usuario', JSON.stringify(userdata));
      }
    });

    this.router.navigate(['/perfil']);
  } else {
    this.router.navigate(['/perfil']);
    sessionStorage.setItem('invalidEmail', 'true'); 
    console.log('Correo no pertenece a la institución o no tiene un formato válido.');
    
  }
}


  // Detecta la autenticación luego de una redirección
  checkRedirectLogin(): Promise<void> {
    console.log('Intentando obtener el resultado de la redirección...');
    return getRedirectResult(this.auth)
      .then((result) => {
        console.log(result);

        if (result && result.user) {
          this.handleLogin(result.user);
        } else {
          console.log('No hay resultado de redirección o el usuario es nulo.');
        }
      })
      .catch((error) => {
        console.error('Error durante la redirección:', error);
      });
  }
  
  
  
}