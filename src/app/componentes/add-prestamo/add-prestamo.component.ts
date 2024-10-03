import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SelecitemComponent } from "../selecitem/selecitem.component";

@Component({
  selector: 'app-add-prestamo',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, SelecitemComponent],
  templateUrl: './add-prestamo.component.html',
  styleUrl: './add-prestamo.component.css'
})
export class AddPrestamoComponent {
  @Input() isVisible: boolean = true;
  newItem = { fecha: '', articulo: '', devolucion: '' ,estado: 'Pendiente'};
  isVisibleSelec = false;
  ClassOnSelec: boolean = false; // Nueva propiedad

  @Output() itemAdded = new EventEmitter<any>();
  @Output() modalClosed = new EventEmitter<void>(); // Emitir cuando se cierra el modal

  closeModal() {
    this.modalClosed.emit();
    this.isVisibleSelec = false;

  }

  openselec(){
      this.isVisibleSelec = true;
      this.ClassOnSelec = true;
  }

  addItem() {
    
    this.itemAdded.emit(this.newItem);
    this.closeModal();
  }
}
