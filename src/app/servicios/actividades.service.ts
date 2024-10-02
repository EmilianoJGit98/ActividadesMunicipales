import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ActividadesService {
  constructor() {}

  actividades = [
    {
      id: 1111133,
      title: 'BAJADA EN LANCHAS EN PASEO DEL RIO',
      modulo: 16.6,
      unit_price: 7200,
    },
    {
      id: 1111135,
      title: 'PASEO EN PIRAGUA 1HS SABADO-DOMINGO-FERIADOS (LOCAL)',
      modulo: 3.4,
      unit_price: 1450,
    },
    {
      id: 1111136,
      title: 'PASEO EN PIRAGUA 1HS SABADO-DOMINGO-FERIADOS (TURISTAS)',
      modulo: 6.7,
      unit_price: 2900,
    },
    {
      id: 1111138,
      title: 'ALQUILER DE CANCHA DEL IGLU 1HS. LUNES A DOMINGO',
      modulo: 12,
      unit_price: 5200,
    },
    {
      id: 1111141,
      title: 'TRAVESIAS NAUTICAS RECORRIDO SABADOS-DOMINGOS-FERIADOS',
      modulo: 67,
      unit_price: 28900,
    },
    {
      id: 1111147,
      title:
        'ALQUILER DE BELOCIPEDO URBANA IND. 1Hs. SABADOS-DOMINGOS-FERIADOS (LOCALES)',
      modulo: 3.4,
      unit_price: 1450,
    },
    {
      id: 1111148,
      title:
        'ALQUILER DE BELOCIPEDO URBANA IND. 1Hs. SABADOS-DOMINGOS-FERIADOS (TURISTAS)',
      modulo: 10.5,
      unit_price: 7950,
    },
    {
      id: 1111152,
      title: 'ALQUILER SALON CULTURAL (LUNES A JUEVES)',
      modulo: 134,
      unit_price: 57850,
    },
    {
      id: 1111153,
      title: 'ALQUILER SALON CULTURAL (VIERNES-SABADOS-DOMINGOS Y FERIADOS)',
      modulo: 2000,
      unit_price: 86350,
    },
    {
      id: 11109217,
      title: 'USUFRUCTO VIA PUBLICA',
      modulo: 519,
      unit_price: 112.000
    },
    {
      id: 1111155,
      title: 'ALQUILER SALON MUSEO (VIERNES-SABADOS-DOMINGOS Y FERIADOS)',
      modulo: 84,
      unit_price: 0.02,
    },
    {
      id: 1111154,
      title: 'ALQUILER SALON MUSEO (LUNES A JUEVES)',
      modulo: 62.5,
      unit_price: 0.01,
    },
   
  ];

  obtenerActividades() {
    return this.actividades;
  }
}
