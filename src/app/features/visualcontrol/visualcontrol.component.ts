import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-visualcontrol',
  templateUrl: './visualcontrol.component.html',
  styleUrls: ['./visualcontrol.component.scss']
})
export class VisualcontrolComponent implements OnInit {
  public businessUnitName: any;
  constructor() { }

  ngOnInit() {

  }

  setCompanyLogo(name, logo) {
    if (logo) {

    } else {
      this.businessUnitName = name;
    }
  }

}
