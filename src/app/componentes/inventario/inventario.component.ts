import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DocaddService } from '../../servicios/edicion/docadd.service';
import { AddInvComponent } from '../../add-inv/add-inv.component';
import { EditInvComponent } from "../edit-inv/edit-inv.component";
import { EditcatComponent } from '../editcat/editcat.component';

@Component({
  selector: 'app-inventario',
  standalone: true,
  imports: [CommonModule, FormsModule, AddInvComponent, EditInvComponent,ReactiveFormsModule,EditcatComponent ],
  templateUrl: './inventario.component.html',
  styleUrl: './inventario.component.css'
})
export class InventarioComponent implements OnInit {
  isModalVisible = false;
  isEditVisible = false;
  selectedItem :any
  inventario: any[] = []; 
  isLoading = false;
  categorias: { name: string; color: string; }[] = [];
  categoriaForm: FormGroup;
  filteredInventario: any[] = [];
  isEditCatVisible = false;

  constructor(private docadd: DocaddService, private fb: FormBuilder) {
    this.categoriaForm = this.fb.group({
      categoriaSeleccionada: ['none'],
      estadoSeleccionado: ['none'],
      textoBusqueda: ['']  // Nuevo FormControl para la búsqueda
    });
   }

   ngOnInit() {
    this.loadPrestamos();
    this.obtenerCat();
    this.categoriaForm.valueChanges.subscribe((formValues) => {
      this.filtrarInventario(formValues.categoriaSeleccionada, formValues.estadoSeleccionado, formValues.textoBusqueda);
    });
  }
  

  filtrarInventario(categoria: string, estado: string, textoBusqueda: string) {
    textoBusqueda = textoBusqueda.trim().toLowerCase();  // Convertir el texto de búsqueda a minúsculas
    
    this.filteredInventario = this.inventario.filter(item => {
      const categoriaMatch = categoria === 'none' || !categoria || item.categoria === categoria;
      const estadoMatch = estado === 'none' || !estado || item.estado === estado;
      
      // Convertir 'noeco' y 'articulo' a string si no lo son
      const noeco = item.noeco ? String(item.noeco).toLowerCase() : '';
      const articulo = item.articulo ? item.articulo.toLowerCase() : '';
      const sn = item.sn ? String(item.sn).toLowerCase() : '';


      const textoMatch = textoBusqueda === '' || 
        articulo.includes(textoBusqueda) || 
        noeco.includes(textoBusqueda) || 
        sn.includes(textoBusqueda);  // Buscar por artículo o No. Económico
  
      return categoriaMatch && estadoMatch && textoMatch; 
    });
  }
  

  async obtenerCat() {
    try {
      this.categorias =  await this.docadd.getCat();
    } catch (error) {
      console.error("Error al obtener categorías", error);
    }
  }
  getcolorcat(categoria: string): string {
    const categoriaEncontrada = this.categorias.find(cat => cat.name === categoria);
    return categoriaEncontrada ? categoriaEncontrada.color : '#000';  // Retorna el color o un valor por defecto
  }
  

  
  mandar(number: any) {
    this.selectedItem = this.inventario.find(item => item.noeco === number);
    if (this.selectedItem) {
      this.isEditVisible = true;  
      console.log(this.selectedItem)

    }
  }


  OpenEditCat(){
    this.isEditCatVisible = true;

  }

  openModal() {
    this.isModalVisible = true;
    console.log(this.isModalVisible);
  }

  closeEdit(){
    this.isEditVisible = false
  }

  closeEditCat(){
    this.isEditCatVisible = false
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

