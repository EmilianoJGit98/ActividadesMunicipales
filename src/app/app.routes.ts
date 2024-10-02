import { RouterModule, Routes } from '@angular/router';
import { RegistrarseComponent } from './registrarse/registrarse.component';
import { ActividadesComponent } from './actividades/actividades.component';
import { ConfirmarInscripcionComponent } from './confirmar-inscripcion/confirmar-inscripcion.component';
import { SelectorEventoComponent } from './selector-evento/selector-evento.component';
import { PagoAprobadoComponent } from './PagoAprobado/PagoAprobado.component';
import { PagoRechazadoComponent } from './PagoRechazado/PagoRechazado.component';

export const routes: Routes = [
  { path: '', component: SelectorEventoComponent },
  { path: 'registrarse/:IDevento', component: RegistrarseComponent },
  { path: 'actividades', component: ActividadesComponent },
  { path: 'actividades/:IDevento', component: ActividadesComponent },
  { path: 'cancelar', component: RegistrarseComponent },
  { path: 'confirmarInscripcion', component: ConfirmarInscripcionComponent },
  { path: 'eventos', component: SelectorEventoComponent },
  { path: 'pago-aprobado/:IDevento', component: PagoAprobadoComponent },
  { path: 'pago-rechazado/:IDevento', component: PagoRechazadoComponent },
];
