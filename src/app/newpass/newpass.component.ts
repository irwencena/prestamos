import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Firestore, doc, updateDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { DocaddService } from '../servicios/edicion/docadd.service';

@Component({
  selector: 'app-newpass',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './newpass.component.html',
  styleUrls: ['./newpass.component.css'],
})
export class NewpassComponent implements OnInit {
  usuario: any = {};
  passwordForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private edicion: DocaddService,
    private router: Router,  
  ) {}

  ngOnInit() {

    const usuarioData = sessionStorage.getItem('usuario');
      if (usuarioData){
          this.usuario = JSON.parse(usuarioData)
      }

    this.passwordForm = this.fb.group(
      {
        newPassword: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      },
      { validators: [this.passwordsMatchValidator, this.passwordsLengthValidator],
       }
    );
  }
  passwordsLengthValidator(form: FormGroup) {
    const newPassword = form.get('newPassword')?.value;

    return (newPassword.length >= 6 ? null : { mismatch2: true })  ;
  }
  // Validador personalizado para verificar que las contraseñas coincidan
  passwordsMatchValidator(form: FormGroup) {
    const newPassword = form.get('newPassword')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;

    return newPassword === confirmPassword ? null : { mismatch: true };
  }

  async onSubmit() {
    if (this.passwordForm.valid) {
      const newPassword = this.passwordForm.get('newPassword')?.value;
      const usuario = JSON.parse(sessionStorage.getItem('usuario') || '{}');
      const nocontrol = usuario.nocontrol;

      if (nocontrol) {
      
        await this.edicion.actualizarPass(newPassword,this.usuario.nocontrol)
        this.usuario.password = true;
        sessionStorage.setItem('usuario', JSON.stringify(this.usuario));
        this.router.navigate(['/perfil']);
      } else {
        console.error('No se encontró el usuario en sessionStorage');
      }
    }
  }

  onCancel() {
    this.router.navigate(['/perfil']);
  }
}
