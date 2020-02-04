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

  public companyId;
  public clientsId;

  ngOnInit() {
    let customerId = this.route.snapshot.paramMap.get('customerId');
    this.clientsId = this.route.snapshot.paramMap.get('customerId');
    this.companyId = this.route.snapshot.paramMap.get('companyId');
    this.stateCode = this.route.snapshot.paramMap.get('stateCode');
    this.getCollaborators(customerId);
  }

  navTolocation() {
    this.router.navigate(["/vc/home/" + this.companyId]);
  }
  navToClients() {
    this.router.navigate(["/vc/clients/" + this.companyId + "/this.stateCode"]);
  }


  getCollaborators(customerId) {

    this.service.getCollaborators(customerId).subscribe(res => {
      if (res != null) {
        this.collaboratorsList = res.data.collaborators;
      }
    });
  }
}
