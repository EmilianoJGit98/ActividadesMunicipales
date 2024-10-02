import { ActividadesOktober24Service } from './../servicios/actividadesOktober24.service';
import { dataRegistro } from './../servicios/data-registro.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ActividadesService } from '../servicios/actividades.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActividadesMunicipalesService } from '../servicios/ActividadesMunicipales.service';

@Component({
  selector: 'app-actividades',
  standalone: true,
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.css'],
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
})
export class ActividadesComponent implements OnInit {
  actividadesMunicipales: any[] = [];
  actividadesOktober: any[] = [];
 
  IDevento: number = 0;
  datosRegistro: any; // Variable que contiene los datos del formulario
  actividades: any[] = [];
  actividadesOktober24: any[] = [];
  selectedActividades: { id: string; unit_price: number; title: string }[] = [];
  totalMonto: number = 0;
  formConfirmar: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private actividadesService: ActividadesService,
    private fb: FormBuilder,
    private router: Router,
    private dataRegistroService: dataRegistro,
    private s_actividades_october: ActividadesOktober24Service,
    private actvMuni: ActividadesMunicipalesService
  ) {
    this.formConfirmar = this.fb.group({
      nombre: [],
      apellido: [],
      dni: [],
      cuit: [],
      correo: [],
      telefono: [],
      cod_area: [],
    });
  }

  ngOnInit() {
    // LISTAR TODAS LAS ACTIVIDADES
    this.route.queryParams.subscribe((params) => {
      this.IDevento = +params['IDevento']; // Convertir a número
      this.actividades = this.actividadesService.obtenerActividades();
      this.actividadesOktober24 =
        this.s_actividades_october.actividadesOktober();
    });


    //LISTAR ACTIVIDADES DINAMICAMENTE
    
    let arrIDRubros: number[] = [];
    // console.log(this.IDevento)
    if (this.IDevento == 1) {
      arrIDRubros = this.actividades.map(actividad => actividad.id) // Ejemplo de IDs a enviar  
    } else if (this.IDevento == 2) {
      arrIDRubros = this.actividadesOktober24.map(actividad => actividad.id) // Ejemplo de IDs a enviar  
    }


    // console.log(arrIDRubros);
    this.obtenerActividadesMuni(arrIDRubros); 


    // console.log(this.actividades);

    // Suscribirse a los datos del registro
    this.dataRegistroService.currentFormData.subscribe((data) => {
      this.datosRegistro = data;
      if (this.datosRegistro) {
        // console.log(
        //   'Datos recibidos en ActividadesComponent: ',
        //   this.datosRegistro
        // );

        // Asignar los datos a formConfirmar
        this.formConfirmar.patchValue({
          nombre: this.datosRegistro.nombre || '',
          apellido: this.datosRegistro.apellido || '',
          dni: this.datosRegistro.dni || null,
          cuit: this.datosRegistro.cuit || null,
          correo: this.datosRegistro.correo || '',
          telefono: this.datosRegistro.telefono || '',
          cod_area: this.datosRegistro.cod_area || '',
        });
      }
    });
  }

  obtenerActividadesMuni(actividades: number[]): void {  
    this.actvMuni.obtenerActividadesPorId(actividades).subscribe(  
      (data) => {  
        this.actividadesMunicipales = data; // Asigna los datos recibidos a la variable  
        // console.log('Actividades obtenidas:', this.actividadesMunicipales);  
      },  
      (error) => {  
        console.error('Error al obtener actividades:', error);  
      }  
    );  
  }  

  onCheckboxChange(
    event: Event,
    actividad: { idSubRubro: string; ImporteSujerido: number; descripcion: string }
  ) {
    const target = event.target as HTMLInputElement;

    if (target.checked) {
      this.selectedActividades.push({
        id: actividad.idSubRubro,
        unit_price: actividad.ImporteSujerido,
        title: actividad.descripcion,
      });
    } else {
      this.selectedActividades = this.selectedActividades.filter(
        (item) => item.id !== actividad.idSubRubro
      );
    }

    this.totalMonto = this.selectedActividades.reduce(
      (total, item) => total + item.unit_price,
      0
    );

    Swal.fire({
      icon: 'info',
      title: 'Total Acumulado: ' + this.totalMonto,
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });

    // console.log(this.selectedActividades);
  }

  onSubmitFormActividades() {
    if (this.selectedActividades.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Advertencia',
        text: 'Debes seleccionar al menos una actividad para continuar.',
        confirmButtonText: 'Aceptar',
      });
      return; // Salir de la función si no hay actividades seleccionadas
    }

    // Verifica si el formulario es válido
    if (this.formConfirmar.valid) {
      const formData = this.formConfirmar.value;

      // Agregar console.log para las variables dni y cuit

      this.dataRegistroService.updateFormData(formData);

      const queryParams = {
        actividadesSeleccionadas: JSON.stringify(this.selectedActividades),
        IDevento: this.IDevento,
        totalMonto: this.totalMonto,
      };

      // Navegar a la página de confirmación
      this.router.navigate(['/confirmarInscripcion'], { queryParams });
    } else {
      // console.log(this.formConfirmar);

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, completa todos los campos requeridos.',
        confirmButtonText: 'Aceptar',
      });
    }
  }
}
