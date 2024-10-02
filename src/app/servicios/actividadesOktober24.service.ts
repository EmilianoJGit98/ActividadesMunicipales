import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ActividadesOktober24Service {
  constructor() {}

  actividades = [
    {
      id: 11109208,
      title: 'FOOD TRUCK 3x3',
      unit_price: 100000,
    },
    {
      id: 11109209,
      title: 'FOOD TRUCK 6x3',
      unit_price: 150000,
    },
    {
      id: 11109210,
      title: 'GAZEBOS',
      unit_price: 100000,
    },
    {
      id: 11109211,
      title: 'PATIOS CERVECEROS 3x5',
      unit_price: 100000,
    },
    {
      id: 11109212,
      title: 'CANTINA ESTUDIANTIL',
      unit_price: 40000,
    },
    {
      id: 11109213,
      title: 'ARTESANOS',
      unit_price: 40000,
    },
    {
      id: 11109214,
      title: 'REVENTAS',
      unit_price: 60000,
    },
    {
      id: 11109215,
      title: 'PACK 1 EMPRESAS CON PANTALLAS',
      unit_price: 0.02,
    },
    {
      id: 11109216,
      title: 'PACK 2 EMPRESAS CON ESPACIOS FISICOS CON PANTALLAS 3x3',
      unit_price: 0.01,
    },
  ];

  actividadesOktober() {
    return this.actividades;
  }
}
