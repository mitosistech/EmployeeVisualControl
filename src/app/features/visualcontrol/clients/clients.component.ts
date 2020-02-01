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

  constructor(private service: VisualcontrolService, private route: ActivatedRoute, public router: Router) { }
  ngOnInit() {
    let locationId = this.route.snapshot.paramMap.get('locationId');
    this.getCustomerList(locationId);
  }

  getCustomerList(locationId) {

    this.service.getCustomerList(locationId).subscribe(res => {
      if (res != null) {
        this.customerList = res.data.customers;
      }
    });
  }

  routeToCollabratorPage(customerId) {
    this.router.navigate(["/vc/collaborators/" + customerId]);
  }

}
