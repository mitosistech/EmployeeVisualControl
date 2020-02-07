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
  ngOnInit() {
    let customerId = this.route.snapshot.paramMap.get('customerId');
    this.clientsId = this.route.snapshot.paramMap.get('customerId');
    this.companyId = this.route.snapshot.paramMap.get('companyId');
    this.stateCode = this.route.snapshot.paramMap.get('stateCode');
    this.getCollaborators(customerId);
  }

  navTolocation() {
    this.router.navigate(["/vc/home/" + this.customer.businessUnitId]);
  }
  navToClients() {
    this.router.navigate(["/vc/clients/" + this.customer.businessUnitId + "/" + this.stateCode]);
  }


  getCollaborators(customerId) {
    this.loaderFlag = true;
    this.service.getCollaborators(customerId).subscribe(res => {
      this.loaderFlag = true;
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
