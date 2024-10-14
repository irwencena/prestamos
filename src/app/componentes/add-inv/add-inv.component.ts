import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DocaddService } from '../../servicios/edicion/docadd.service';

@Component({
  selector: 'app-add-inv',
  standalone: true,
  imports: [CommonModule,RouterModule,FormsModule,ReactiveFormsModule],
  templateUrl: './add-inv.component.html',
  styleUrl: './add-inv.component.css'
})
export class AddInvComponent {

  constructor(private docadd: DocaddService, private fb: FormBuilder) {
    this.categoriaForm = this.fb.group({
      categoriaSeleccionada: ['']
    });
   }
  @Input() isVisible: boolean = true;

  newItem = { noeco:'', articulo: '', estado: '' ,categoria: '', sn: ''};

  @Output() itemAdded = new EventEmitter<any>();
  @Output() modalClosed = new EventEmitter<void>(); 
  @Output() editClosed = new EventEmitter<void>(); 
  closeModal() {
    this.modalClosed.emit(); 
  }
  categoriasGet: { name: string; color: string; }[] = [];
  categoriaForm: FormGroup;

  ngOnInit(): void {
    this.obtenerCat()
  }


  async obtenerCat() {
    try {
      this.categoriasGet =  await this.docadd.getCat();
    } catch (error) {
      console.error("Error al obtener categorías", error);
    }
  }
  

  addItem() {
    this.itemAdded.emit(this.newItem);
    this.newItem = { noeco:'', articulo: '', estado: '' ,categoria: '', sn: ''};
    this.closeModal();
  }
}
