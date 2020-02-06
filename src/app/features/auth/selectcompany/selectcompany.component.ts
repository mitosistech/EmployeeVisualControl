import { Component, OnInit } from '@angular/core';
import { SelectcompanyService } from './selectcompany.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-selectcompany',
  templateUrl: './selectcompany.component.html',
  styleUrls: ['./selectcompany.component.scss']
})
export class SelectcompanyComponent implements OnInit {
  public companyList = [];
  constructor(private service: SelectcompanyService, public router: Router) { }

  ngOnInit() {
    this.getCompanyList();
  }

  getCompanyList() {
    this.service.getCompanyList().subscribe(res => {
      this.companyList = res[0].business_units;
    });
  }

  selectCompany(businessid) {
    if (businessid) {
      localStorage.setItem("businessid", businessid);
      this.router.navigate(["/vc/home/" + businessid]);
    }
  }

  logout() {
    localStorage.clear();
    this.router.navigate(["/login"]);
  }
}
