import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-visualcontrol',
  templateUrl: './visualcontrol.component.html',
  styleUrls: ['./visualcontrol.component.scss']
})
export class VisualcontrolComponent implements OnInit {
  public businessUnitName: any;
  constructor(public router: Router) { }

  ngOnInit() {

  }

  setCompanyLogo(name, logo) {
    if (logo) {

    } else {
      this.businessUnitName = name;
    }
  }

  navigateToCreateManager() {
    let businessid = localStorage.getItem("businessid");
    this.router.navigate(["/vc/addmanager/" + businessid]);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(["/login"]);
  }

}
