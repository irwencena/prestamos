import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DocaddService } from '../../servicios/edicion/docadd.service';
import { AddInvComponent } from '../../add-inv/add-inv.component';
import { EditInvComponent } from "../../edit-inv/edit-inv.component";

@Component({
  selector: 'app-inventario',
  standalone: true,
  imports: [CommonModule, FormsModule, AddInvComponent, EditInvComponent,ReactiveFormsModule ],
  templateUrl: './inventario.component.html',
  styleUrl: './inventario.component.css'
})
export class InventarioComponent implements OnInit {
  isModalVisible = false;
  isEditVisible = false;
  selectedItem :any
  inventario: any[] = []; 
  isLoading = false;
  categorias: string[] = [];
  categoriaForm: FormGroup;
  filteredInventario: any[] = []; // Nuevo arreglo para el inventario filtrado

  constructor(private docadd: DocaddService, private fb: FormBuilder) {
    this.categoriaForm = this.fb.group({
      categoriaSeleccionada: ['none'],
      estadoSeleccionado: ['none']
    });
   }

   ngOnInit() {
    this.loadPrestamos();
    this.obtenerCat();
    this.categoriaForm.valueChanges.subscribe((formValues) => {
      this.filtrarInventario(formValues.categoriaSeleccionada, formValues.estadoSeleccionado);
    });
  }

  filtrarInventario(categoria: string, estado: string) {
    this.filteredInventario = this.inventario.filter(item => {
      const categoriaMatch = categoria === 'none' || !categoria || item.categoria === categoria;
      const estadoMatch = estado === 'none' || !estado || item.estado === estado;
      return categoriaMatch && estadoMatch; // Ambos criterios deben coincidir
    });
  }

  async obtenerCat() {
    try {
      const categorias2: string[] = await this.docadd.getCat();
      this.categorias = categorias2;  // Ahora 'categorias2' es un arreglo de strings
    } catch (error) {
      console.error("Error al obtener categorías", error);
      this.categorias = [];  // En caso de error, asigna un arreglo vacío
    }
  }
  

  
  mandar(number: any) {
    this.selectedItem = this.inventario.find(item => item.noeco === number);
    if (this.selectedItem) {
      this.isEditVisible = true;  
    }
  }

  openModal() {
    this.isModalVisible = true;
    console.log(this.isModalVisible);
  }

  closeEdit(){
    this.isEditVisible = false
  }

  closeModal() {
    this.isModalVisible = false;
    console.log(this.isModalVisible);
  }
  
  async addItem(newItem: any) {
    await this.docadd.añadirinv(newItem);
    this.loadPrestamos(); 
  }

  async itemEdited(newitenedited: any){
    await this.docadd.updateEditItem(newitenedited);
    this.loadPrestamos(); 
  }

  async itemDelete(newitemDelet: any){
    await this.docadd.eliminarItemInv(newitemDelet);
    this.loadPrestamos();

  }

  async loadPrestamos() {
    this.isLoading = true; 
    this.inventario = await this.docadd.docgetinv();
    this.filteredInventario = this.inventario; // Iniciar con todos los elementos
    this.isLoading = false; 
  }
  
}

