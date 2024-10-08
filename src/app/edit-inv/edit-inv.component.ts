import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DocaddService } from '../servicios/edicion/docadd.service';
@Component({
  selector: 'app-edit-inv',
  standalone: true,
  imports: [FormsModule,RouterModule,CommonModule,ReactiveFormsModule],
  templateUrl: './edit-inv.component.html',
  styleUrl: './edit-inv.component.css'
})
export class EditInvComponent implements OnInit{
  @Input() selectedItem: any = { noeco: '', articulo: '', estado: '', categoria: '',sn: '' }; 

  @Input() isVisibleEdit: boolean = true;
  newItem = { noeco:'', articulo: '', estado: '' ,categoria: '',sn: ''};

  @Output() itemEdited = new EventEmitter<any>();
  @Output() itemBorrar = new EventEmitter<any>();

  @Output() editClosed = new EventEmitter<void>(); 

  categoriasGet: string[] = [];
  categoriaForm: FormGroup;
  constructor(private docadd: DocaddService, private fb: FormBuilder) {
    this.categoriaForm = this.fb.group({
      categoriaSeleccionada: ['']
    });
   }
  ngOnInit(): void {
    this.obtenerCat()
  }


   async obtenerCat() {
    try {
      const categorias2: string[] = await this.docadd.getCat();
      this.categoriasGet = categorias2;  // Ahora 'categorias2' es un arreglo de strings
    } catch (error) {
      console.error("Error al obtener categorías", error);
      this.categoriasGet = [];  // En caso de error, asigna un arreglo vacío
    }
  }

  closeEdit() {
    this.editClosed.emit(); 
  }

  eliminar(){
    this.itemBorrar.emit(this.selectedItem);
    this.editClosed.emit();
  }

  testing(){
    console.log(this.selectedItem)
    this.itemEdited.emit(this.selectedItem);
    this.closeEdit();
  }

  addItem() {
    this.itemEdited.emit(this.selectedItem);
    this.closeEdit();
  }
}
