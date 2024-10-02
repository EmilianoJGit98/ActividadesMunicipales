import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class dataRegistro {
  private formDataSource = new BehaviorSubject<any>(null);
  currentFormData = this.formDataSource.asObservable();

  constructor() {}

  updateFormData(data: any) {
    this.formDataSource.next(data);
  }
}
