import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { dataRegistro } from '../servicios/data-registro.service';
import Swal from 'sweetalert2'; // Si no lo has importado, asegúrate de hacerlo
import { PagoPersonalizadoService } from '../servicios/pagoPersonalizado.service';
import { HttpClient } from '@angular/common/http';

interface IParticipante {
  nombre: string;
  apellido?: string;
  dni?: number;
  cuit?: number;
  correo: string;
  cod_area: string;
  telefono: number;
}
interface IItems {
  id: string;
  unit_price: number;
  title: string;
}
declare var MercadoPago: any;
@Component({
  selector: 'app-confirmar-inscripcion',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './confirmar-inscripcion.component.html',
  styleUrls: ['./confirmar-inscripcion.component.css'],
  providers: [],
})
export class ConfirmarInscripcionComponent implements OnInit {
  IDevento: number = 0;
  totalMonto: number = 0;
  dataObject: any;
  publicKey = 'APP_USR-9447b8bb-b859-4dcb-828d-fe47d345edfc'; // Asigna tu clave pública
  locale = 'es-AR'; // O el idioma que desees
  paymentId: number | 0 = 0;
  participanteId: number | 0 = 0;

  // Inicializa `formRegistroData` con un objeto que tiene las propiedades necesarias.
  formRegistroData: IParticipante = {
    nombre: '',
    cod_area: '',
    telefono: 0,
    correo: '',
    cuit: 0,
  };

  //nota

  ArrActividades: IItems[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dataRegistroService: dataRegistro,
    private pagoPersonalizado: PagoPersonalizadoService
  ) // private formBuilder: FormBuilder
  {}

  ngOnInit(): void {
    const formDataString = localStorage.getItem('formRegistroData');
    if (formDataString) {
      this.formRegistroData = JSON.parse(formDataString);

      // console.log(JSON.stringify(this.formRegistroData));
    }

    // Suscribirse a los datos del servicio
    this.dataRegistroService.currentFormData.subscribe((data) => {
      if (data) {
        this.formRegistroData = data;
        // console.log(JSON.stringify(this.formRegistroData));
        // Almacenar formRegistroData en localStorage
        localStorage.setItem(
          'formRegistroData',
          JSON.stringify(this.formRegistroData)
        );
      } else {
        // console.warn('No se recibieron datos de registro.');
        // Ya inicializado por defecto al principio
      }
    });

    // Obtener parámetros de la ruta si es necesario
    this.route.queryParams.subscribe((params) => {
      this.paymentId = params['payment_id'];
      this.participanteId = params['idContribuyente'];
      this.IDevento = params['IDevento'];
      this.totalMonto = params['totalMonto'];
      this.ArrActividades = params['actividadesSeleccionadas']
        ? JSON.parse(params['actividadesSeleccionadas'])
        : null;
      this.formRegistroData;

      // Verificar si paymentId existe
      if (this.paymentId) {
        console.log('Payment ID recibido:', this.paymentId);
        console.log('conbtribuyente:', this.participanteId);
        this.checkPayment(this.paymentId, this.participanteId);
        this.router.navigate(['/pago-aprobado/' + this.IDevento]);
      } else {
        console.log('No se encontró el payment_id.');
      }
    });
  }

  limpiarDatos() {
    localStorage.removeItem('formRegistroData');
    localStorage.removeItem('actividadesSeleccionadas');
  }

  cancelarOperacion() {
    const queryParams = {
      IDevento: this.IDevento,
    };

    Swal.fire({
      title: 'Está seguro que desea cancelar la operación?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonText: 'Continuar operación',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Terminar operación',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Operación Cancelada!',
          text: 'Gracias por visitarnos.',
          icon: 'success',
        });

        // this.limpiarDatos();
        this.router.navigate(['/eventos']);
        // this.router.navigate(['/pago-rechazado/'+this.IDevento]);
        // this.router.navigate(['/pago-aprobado/'+this.IDevento]);
      }
    });
  }

  cargando: boolean = false;
  OcultaBoton: boolean = false;

  putPago() {
    this.cargando = true;

    this.dataObject = {
      participante: {
        nombre: this.formRegistroData.nombre,
        apellido: this.formRegistroData.apellido,
        dni: this.formRegistroData.dni,
        cuit: this.formRegistroData.cuit,
        mail: this.formRegistroData.correo,
        codigoArea: this.formRegistroData.cod_area,
        numero: this.formRegistroData.telefono,
      },
      items: this.ArrActividades,
    };

    this.pagoPersonalizado.enviarPago(this.dataObject).subscribe({
      next: (res: any) => {
        // console.log('Respuesta recibida:', res);
        this.participanteId = res.participante;
        console.log('id Participante:', this.participanteId);

        this.createCheckoutButton(res.id);

        // this.router.navigate(['/pago-aprobado/'+this.IDevento]);
      },
      complete: () => {
        console.log('Datos enviados correctamente.');
        this.cargando = false;
      },
      error: (error: any) => {
        // console.error('Error al enviar datos', error);
        this.router.navigate(['/pago-rechazado/' + this.IDevento]);
        this.cargando = false;
      },
    });
  }
  async createCheckoutButton(preferenceId: string): Promise<void> {
    const mercadopago = new MercadoPago(this.publicKey, {
      locale: this.locale,
    });

    const bricksBuilder = mercadopago.bricks();
    await this.renderComponent(bricksBuilder, preferenceId);
  }

  private async renderComponent(
    bricksBuilder: any,
    preferenceId: string
  ): Promise<void> {
    if (window.checkoutButton) window.checkoutButton.unmount();
    await bricksBuilder.create('wallet', 'formActividadbtn', {
      initialization: {
        preferenceId: preferenceId,
      },
      callbacks: {
        onError: (error: any) =>
          console.error('Error en el botón de pago:', error),
        onReady: () => {
          console.log('Botón de pago listo');
          this.OcultaBoton = true;
        },
      },
    });
  }
  private async checkPayment(paymentId: number, participanteId: number) {
    // Verificar si la conversión fue exitosa
    if (!isNaN(this.paymentId)) {
      this.participanteId = participanteId;
      this.pagoPersonalizado
        .getPayment(this.paymentId, this.participanteId)
        .subscribe({
          next: (res: any) => {
            console.log('Respuesta payment:', res);
            console.log('participante:' + this.participanteId);
          },
          complete: () => {
            console.log('Datos enviados correctamente.');
          },
          error: (error: any) => {
            console.error('Error al enviar datos', error);
          },
        });
    } else {
      console.error('paymentId no es un número válido:', paymentId);
      // console.log("mercado pago ejecutad")
    }
  }
}
