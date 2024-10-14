import { Component, EventEmitter, Output } from '@angular/core';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-alertalogin',
  standalone: true,
  imports: [],
  templateUrl: './alertalogin.component.html',
  styleUrl: './alertalogin.component.css'
})
export class AlertaloginComponent {
  @Output() cerrar = new EventEmitter<void>(); // Define el evento de cierre

  cerrarAviso() {
    this.cerrar.emit(); // Emite el evento cuando se cierra el aviso
  }
}
