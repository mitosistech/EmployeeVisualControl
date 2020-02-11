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
  public loaderFlag = false;
  public role: any;
  public businessid: any;
  constructor(private service: SelectcompanyService, public router: Router) { }

  ngOnInit() {
    this.getCompanyList();

    let str = localStorage.getItem("role");
    if (str == "false") {
      this.role = false;
    } else {
      this.role = true;
    }
  }

  getCompanyList() {
    this.loaderFlag = true;
    this.service.getCompanyList().subscribe(res => {
      this.companyList = res[0].business_units;
      this.loaderFlag = false;
      // this.businessid = this.companyList[0].id;
      // console.log(this.businessid);
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
