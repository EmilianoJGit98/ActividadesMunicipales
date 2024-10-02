import { dataRegistro } from './../servicios/data-registro.service';
import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-registrarse',
  standalone: true,
  templateUrl: './registrarse.component.html',
  styleUrls: ['./registrarse.component.css'],
  imports: [CommonModule, ReactiveFormsModule],
})
export class RegistrarseComponent implements OnInit {
  IDevento: number;
  registroForm: FormGroup; //variable que va a contener todas las validaciones del formulario
  tipoPersona: number = 1; // Por defecto, Persona Física
  srcIcono: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private dataRegistro: dataRegistro
  ) {
    this.IDevento = 0;

    this.registroForm = this.fb.group({
      // Inicializando aquí
      dni: [
        null,
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(8),
          Validators.pattern(/^\d+$/),
        ],
      ],
      cuit: [
        null,
        [
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(11),
          Validators.pattern(/^\d+$/),
        ],
      ],
      nombre: [
        '',
        [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚÑñ\s]+$/)],
      ],
      apellido: [
        null,
        [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúÁÉÍÓÚÑñ\s]+$/)],
      ],
      correo: ['', [Validators.email]],
      cod_area: [
        null,
        [
          Validators.required,
          Validators.maxLength(3),
          Validators.pattern(/^\+\d{1,3}$/),
        ],
      ],
      telefono: [null, [Validators.required, Validators.pattern(/^\d+$/)]],
    });
  }

  ngOnInit(): void {
    this.onTipoPersonaChange(); // Ajustar las validaciones al inicio

    this.route.params.subscribe((params) => {
      this.IDevento = +params['IDevento']; // Convertir a número
      //console.log(this.IDevento); // Aquí puedes usar el parámetro según lo necesites
    });

    this.setIconoByID(this.IDevento);
  }

  private setIconoByID(id: number): void {
    if (id === 1) {
      this.srcIcono = 'img/municipalidad/ferroH.png';
    } else if (id === 2) {
      this.srcIcono = 'img/oktoberfest/logoOktoberH.png';
    } else {
      this.srcIcono = 'default/path/to/image.png'; // Valor por defecto si no coincide
    }
  }

  onTipoPersonaChange(): void {
    // cambia las validaciones segun el tipo de persona, persona fisca = 1 o juridica 2
    if (this.tipoPersona === 1) {
      this.registroForm
        .get('dni')!
        .setValidators([
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(8),
          Validators.pattern(/^\d+$/),
        ]);
      this.registroForm.get('cuit')!.clearValidators();
      this.registroForm.get('apellido')!.clearValidators();
    } else if (this.tipoPersona === 2) {
      this.registroForm
        .get('cuit')!
        .setValidators([
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(11),
          Validators.pattern(/^\d+$/),
        ]);
      this.registroForm.get('dni')!.clearValidators();
    }

    // Aplicar las validaciones
    this.registroForm.get('dni')!.updateValueAndValidity();
    this.registroForm.get('cuit')!.updateValueAndValidity();
  }

  onSubmit() {
    if (this.registroForm.valid) {
      const formData = this.registroForm.value;
      this.dataRegistro.updateFormData(formData); //actualizar los datos de la persona en el servicio

      this.router.navigate(['/actividades'], {
        queryParams: { IDevento: this.IDevento },
      });
      // Aquí puedes realizar el envío del formulario
    }
  }
}
