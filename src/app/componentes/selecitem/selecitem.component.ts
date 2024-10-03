import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { DocaddService } from '../../servicios/edicion/docadd.service';

@Component({
  selector: 'app-selecitem',
  standalone: true,
  imports: [RouterLink,CommonModule,FormsModule],
  templateUrl: './selecitem.component.html',
  styleUrl: './selecitem.component.css'
})
export class SelecitemComponent {
  prestamos: any[] = []; 
  isLoading = false;
  @Input() isVisibleSelec: boolean = true;

  constructor(private docadd: DocaddService) { }

  ngOnInit() {
    this.loadPrestamos();
  }

  async loadPrestamos() {
    this.isLoading = true; 
    this.prestamos = await this.docadd.docgetinv();
    this.isLoading = false; 
  }
}
