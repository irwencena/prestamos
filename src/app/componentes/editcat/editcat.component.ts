import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DocaddService } from '../../servicios/edicion/docadd.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editcat',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './editcat.component.html',
  styleUrl: './editcat.component.css'
})
export class EditcatComponent implements OnInit{
  @Input() isVisibleEdit: boolean = true;
  @Output() editCatClosed = new EventEmitter<void>(); 
  categorias: { name: string; color: string; }[] = [];
  newcategoria: any =  {name: '', color: String};
  ngOnInit(): void {
    this.obtenerCat()
  }
  constructor(private docadd: DocaddService, private router: Router){}

  onCategoriaAgregada() {
    this.obtenerCat();
  }

testing(){
  console.log('Info recuperada: ',this.newcategoria)
  this.docadd.addCat(this.newcategoria)

}

async obtenerCat() {
  try {
    this.categorias =  await this.docadd.getCat();
  } catch (error) {
    console.error("Error al obtener categorías", error);
  }
}

  closeEdit() {
    this.editCatClosed.emit(); 
  }

}
