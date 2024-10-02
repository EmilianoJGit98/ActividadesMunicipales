import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-PagoAprobado',
  standalone: true,
  templateUrl: './PagoAprobado.component.html',
  styleUrls: ['./PagoAprobado.component.css'],
  imports:[CommonModule, ReactiveFormsModule, RouterModule]
})
export class PagoAprobadoComponent implements OnInit {
  IDevento: number;
  private route: ActivatedRoute; // Agregamos esta propiedad  
  

  constructor(private router: Router, route: ActivatedRoute) {
    this.IDevento = 0;
    this.route = route
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.IDevento = +params['IDevento']; // Convertir a número
      console.log(this.IDevento); // Aquí puedes usar el parámetro según lo necesites
    });
  }

  FinalizarRegistro(){

  }

}
