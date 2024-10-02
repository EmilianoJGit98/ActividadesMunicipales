import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-PagoRechazado',
  standalone: true,
  templateUrl: './PagoRechazado.component.html',
  styleUrls: ['./PagoRechazado.component.css'],
  imports: [RouterModule]
})
export class PagoRechazadoComponent implements OnInit {
  IDevento: number;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.IDevento = 0;
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.IDevento = +params['IDevento']; // Convertir a número
      //console.log(this.IDevento); // Aquí puedes usar el parámetro según lo necesites
    });
  }

}
