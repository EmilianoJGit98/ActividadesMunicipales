import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PagoPersonalizadoService {

  private apiUrl = 'http://192.168.0.248:3002/api/municipalidad-mp';  

constructor(private http: HttpClient) { }


 enviarPago(data: any): Observable<any> {  
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });  
    return this.http.post<any>(this.apiUrl+'/inscripcion', data, { headers });  
  } 
  getPayment(paymentId: number, idParticipante: number): Observable<any> {  
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });  
    return this.http.get<any>(`${this.apiUrl}/verificar-pago/${paymentId}/${idParticipante}`, { headers });  
  } 
}
