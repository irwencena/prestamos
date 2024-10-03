import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-add-inv',
  standalone: true,
  imports: [CommonModule,RouterModule,FormsModule],
  templateUrl: './add-inv.component.html',
  styleUrl: './add-inv.component.css'
})
export class AddInvComponent {

  @Input() isVisible: boolean = true;

  newItem = { noeco:'', articulo: '', estado: '' ,categoria: '', sn: ''};

  @Output() itemAdded = new EventEmitter<any>();
  @Output() modalClosed = new EventEmitter<void>(); 
  @Output() editClosed = new EventEmitter<void>(); 
  closeModal() {
    this.modalClosed.emit(); 
  }

  addItem() {
    this.itemAdded.emit(this.newItem);
    this.newItem = { noeco:'', articulo: '', estado: '' ,categoria: '', sn: ''};
    this.closeModal();
  }
}
