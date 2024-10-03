import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AddPrestamoComponent } from "../add-prestamo/add-prestamo.component";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { DocaddService } from '../../servicios/edicion/docadd.service';
@Component({
  selector: 'app-prestamos',
  standalone: true,
  imports: [CommonModule, FormsModule, AddPrestamoComponent],
  templateUrl: './prestamos.component.html',
  styleUrl: './prestamos.component.css'
})
export class PrestamosComponent implements OnInit {
  isModalVisible = false;
  prestamos: any[] = []; 
  usuario: any = {};
  isLoading = false;

  constructor(private docadd: DocaddService) {     
  }

  ngOnInit() {
    const usuarioData = sessionStorage.getItem('usuario');
      if (usuarioData){
          this.usuario = JSON.parse(usuarioData)
      }
    this.loadPrestamos(this.usuario);
  }

  openModal() {
    this.isModalVisible = true;
    console.log(this.isModalVisible);
  }

  closeModal() {
    this.isModalVisible = false;
    console.log(this.isModalVisible);
  }
  
  async addItem(newItem: any, data:any) {
    await this.docadd.añadir(newItem);
    this.loadPrestamos(data); // Recargar los datos después de añadir un nuevo item
  }

  async loadPrestamos(data: any) {
    this.isLoading = true; // Empezar a cargar
    this.prestamos = await this.docadd.docget(data);
    this.isLoading = false; // Termina la carga
  }
}
