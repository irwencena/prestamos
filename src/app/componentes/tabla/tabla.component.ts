import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { DocaddService } from '../../servicios/edicion/docadd.service';

@Component({
  selector: 'app-tabla',
  standalone: true,
  imports: [RouterOutlet, CommonModule,FormsModule],
  templateUrl: './tabla.component.html',
  styleUrl: './tabla.component.css'
})
export class TablaComponent implements OnInit {
  constructor(private router: Router, private get: DocaddService){}
  usuario: any = {};
  ngOnInit():  void {

    

    const invalidEmail = sessionStorage.getItem('invalidEmail');
    if (invalidEmail === 'true') {
        this.router.navigate(['/login']);
    }

      const usuarioData = sessionStorage.getItem('usuario');
      if (usuarioData){
          this.usuario = JSON.parse(usuarioData)
      }
      
  
        
      

  }

  establecercontra(){
    this.router.navigate(['/ActualizarContrasena']);
  }

}
