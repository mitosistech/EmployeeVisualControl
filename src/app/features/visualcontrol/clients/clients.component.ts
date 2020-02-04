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
  constructor(private service: VisualcontrolService, private route: ActivatedRoute, public router: Router) { }
  ngOnInit() {
    let locationId = this.route.snapshot.paramMap.get('locationId');
    this.companyId = this.route.snapshot.paramMap.get('businessId');
    this.stateCode = this.route.snapshot.paramMap.get('stateCode');
    this.getCustomerList();
  }
  navToClients() {
    this.router.navigate(["/vc/home/" + this.companyId]);
  }
  getCustomerList() {

    this.service.getCustomerList(this.companyId, this.stateCode).subscribe(res => {
      if (res != null) {
        this.customerList = res.data.customers;
      }
    });
  }

  routeToCollabratorPage(customerId) {
    this.router.navigate(["/vc/collaborators/" + customerId + "/" + this.stateCode]);
  }

}
