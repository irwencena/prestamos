import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DocaddService } from '../../servicios/edicion/docadd.service';

@Component({
  selector: 'app-administrar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './administrar.component.html',
  styleUrl: './administrar.component.css'
})
export class AdministrarComponent implements OnInit {
  users: any[] = [];
  isLoading = false;
  
  constructor(private docadd: DocaddService) {}

  
  ngOnInit() {
    this.loadUsuarios();
  }

  async loadUsuarios() {
    this.isLoading = true; 
    this.users = await this.docadd.docgetusers();
    this.isLoading = false;
    for (let user of this.users) {
      user.prestamos = await this.loadPrestamos(user.nocontrol);
    }
     // Termina la carga
  }

  async loadPrestamos(nocontrol: string) {
    try {
      return await this.docadd.docget({ nocontrol });
    } catch (error) {
      console.error('Error al cargar los préstamos: ', error);
      return [];
    }
  }

  togglePrestamo(user: any) {
    user.isHighlighted = !user.isHighlighted;
  }
}
