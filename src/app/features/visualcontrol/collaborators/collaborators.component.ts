import { Component, OnInit } from '@angular/core';
import { VisualcontrolService } from '../visualcontrol.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-collaborators',
  templateUrl: './collaborators.component.html',
  styleUrls: ['./collaborators.component.scss']
})
export class CollaboratorsComponent implements OnInit {

  constructor(private service: VisualcontrolService, private route: ActivatedRoute, public router: Router) { }
  public collaboratorsList = [];
  public stateCode: any;
  public norecordFound = false;
  public companyId;
  public clientsId;
  public customer;
  public loaderFlag = false;
  public role: any;
  public companyName: any;
  public customerName: any;
  ngOnInit() {
    let customerId = this.route.snapshot.paramMap.get('customerId');
    this.clientsId = this.route.snapshot.paramMap.get('customerId');
    this.companyId = this.route.snapshot.paramMap.get('companyId');
    this.stateCode = this.route.snapshot.paramMap.get('stateCode');
    this.customerName = localStorage.getItem("customerName");
    this.companyName = localStorage.getItem("companyName");
    let str = localStorage.getItem("role");
    if (str == "false") {
      this.role = false;
    } else {
      this.role = true;
    }
    this.getCollaborators(customerId);
  }
  routeToHome() {
    let userId = localStorage.getItem("loginUserId");
    this.router.navigate(["/selectCompany/" + userId]);
  }
  navTolocation() {
    let businessid = localStorage.getItem("businessid");
    this.router.navigate(["/vc/home/" + businessid]);
  }
  navToClients() {
    let businessid = localStorage.getItem("businessid");
    this.router.navigate(["/vc/clients/" + businessid + "/" + this.stateCode]);
  }


  getCollaborators(customerId) {
    this.loaderFlag = true;
    this.service.getCollaborators(customerId, this.stateCode).subscribe(res => {
      this.loaderFlag = false;
      if (res != null) {
        this.customer = res.data.customer;
        this.collaboratorsList = res.data.collaborators;
        if (this.collaboratorsList.length == 0) {
          this.norecordFound = true;
        }
      } else {
        this.norecordFound = true;
      }

    });
  }
}
