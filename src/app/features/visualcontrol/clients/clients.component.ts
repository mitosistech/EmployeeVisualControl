import { Component, OnInit } from '@angular/core';
import { VisualcontrolService } from '../visualcontrol.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
  public customerList = [];
  public stateCode: any;
  public companyId;
  public norecordFound = false;
  public loaderFlag = false;
  public role: any;
  public companyName: any;
  constructor(private service: VisualcontrolService, private route: ActivatedRoute, public router: Router) { }
  ngOnInit() {
    let locationId = this.route.snapshot.paramMap.get('locationId');
    this.companyId = this.route.snapshot.paramMap.get('businessId');
    this.stateCode = this.route.snapshot.paramMap.get('stateCode');
    let str = localStorage.getItem("role");
    if (str == "false") {
      this.role = false;
    } else {
      this.role = true;
    }
    this.getCustomerList();
    this.companyName = localStorage.getItem("companyName");
  }
  navToClients() {
    this.router.navigate(["/vc/home/" + this.companyId]);
  }
  routeToHome() {
    let userId = localStorage.getItem("loginUserId");
    this.router.navigate(["/selectCompany/" + userId]);
  }
  getCustomerList() {
    this.loaderFlag = true;
    this.service.getCustomerList(this.companyId, this.stateCode).subscribe(res => {
      this.loaderFlag = false;
      if (res != null) {
        this.customerList = res.data.customers;

        if (this.customerList.length == 0) {
          this.norecordFound = true;
        }
      } else {
        this.norecordFound = true;
      }

    });
  }

  routeToCollabratorPage(customerId, customerName) {
    localStorage.setItem("customerName", customerName);
    this.router.navigate(["/vc/collaborators/" + customerId + "/" + this.stateCode]);
  }

}
