import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  IDevento: number;
  constructor(private route: ActivatedRoute) {
    this.IDevento =0;
  }

  ngOnInit() {
  }

}
