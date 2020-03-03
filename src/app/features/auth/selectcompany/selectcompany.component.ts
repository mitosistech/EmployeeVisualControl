import { Component, OnInit } from '@angular/core';
import { SelectcompanyService } from './selectcompany.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
  constructor(private toastr: ToastrService, private service: SelectcompanyService, public router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    let userId = this.route.snapshot.paramMap.get('userId');
    this.getCompanyList(userId);

    let str = localStorage.getItem("role");
    if (str == "false") {
      this.role = false;
    } else {
      this.role = true;
    }
  }

  getCompanyList(userId) {
    this.loaderFlag = true;
    this.service.getCompanyListByUserID(userId).subscribe(res => {
      this.companyList = res.data.businessUnits;
      this.loaderFlag = false;
      // this.businessid = this.companyList[0].id;
      console.log(this.companyList);
    });

  }



  selectCompany(businessid) {

    if (businessid) {
      this.loaderFlag = true;
      //validate client count
      this.service.getBusinessUnitCount(businessid).subscribe(res => {
        this.loaderFlag = false;
        if (res.data && res.data.collaboratorsCount && res.data.collaboratorsCount > 0) {
          localStorage.setItem("businessid", businessid);
          this.router.navigate(["/vc/home/" + businessid]);
        } else {
          this.toastr.error("Esta unidade de negócio não possui colaboradores ativos!");
        }
      });
    }
  }

  logout() {
    localStorage.clear();
    this.router.navigate(["/login"]);
  }
}
