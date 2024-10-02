import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ActividadesMunicipalesService {
  private apiUrl =
    'http://192.168.0.248:3002/api/municipalidad-mp/listar-actividades'; // Reemplaza con tu URL de API real

  actividades: any[] = [];

  constructor(private http: HttpClient) {}

  // Método para obtener actividades por ID
  public obtenerActividadesPorId(ids: number[]): Observable<any> {
    // Convertimos el array de IDs a una cadena separada por comas
    const idString = ids.join(',');
    return this.http.get<any>(`${this.apiUrl}?actividades=${idString}`);
  }

  // Método para obtener todas las actividades y almacenarlas
  public obtenerTodasLasActividades(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      tap((data: any[]) => {
        this.actividades = data; // Almacena la respuesta en el servicio
        // console.log('Actividades almacenadas:', this.actividades); // Muestra en consola las actividades almacenadas
      })
    );
  }

  // Método para obtener la lista almacenada de actividades
  public obtenerActividadesAlmacenadas(): any[] {
    return this.actividades;
  }
}
