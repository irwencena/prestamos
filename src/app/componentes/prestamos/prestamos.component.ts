import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AddPrestamoComponent } from "../add-prestamo/add-prestamo.component";
import { DocaddService } from '../../servicios/edicion/docadd.service';
import { GetTimeService } from '../../servicios/tiempoGetAPI/get-time.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-prestamos',
  standalone: true,
  imports: [CommonModule, FormsModule, AddPrestamoComponent,HttpClientModule ],
  templateUrl: './prestamos.component.html',
  styleUrl: './prestamos.component.css',
  providers: [GetTimeService]

})
export class PrestamosComponent implements OnInit {
  isModalVisible = false;
  prestamos: any[] = []; 
  usuario: any = {};
  isLoading = false;
  mostrarAdding: boolean = false;
  showAlertInfo: boolean = false;

  constructor(private docadd: DocaddService, private httpClient: HttpClient, private horaService: GetTimeService) {     
  }
 
 

  ngOnInit() {
    const usuarioData = sessionStorage.getItem('usuario');
      if (usuarioData){
          this.usuario = JSON.parse(usuarioData)
      }
    this.loadPrestamos(this.usuario);

    this.horaService.HorarioCheck().then((DateAPIBool) => {
      this.mostrarAdding = DateAPIBool;
      if (DateAPIBool === false){
        this.showAlertInfo = true
      }
      console.log('¿Estas dentro del horario?, Estado:', this.mostrarAdding);
    }).catch((error) => {
      console.error('Error al obtener la hora:', error);
    });
    
      

  }

  cerrarInfoHorario(){
    this.showAlertInfo = false
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
