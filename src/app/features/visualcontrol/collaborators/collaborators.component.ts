import { Component, OnInit } from '@angular/core';
import { VisualcontrolService } from '../visualcontrol.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-collaborators',
  templateUrl: './collaborators.component.html',
  styleUrls: ['./collaborators.component.scss']
})
export class CollaboratorsComponent implements OnInit {

  constructor(private service: VisualcontrolService, private route: ActivatedRoute) { }
  public collaboratorsList = [];
  public stateCode: any;
  ngOnInit() {
    let customerId = this.route.snapshot.paramMap.get('customerId');
    this.stateCode = this.route.snapshot.paramMap.get('stateCode');
    this.getCollaborators(customerId);
  }
  getCollaborators(customerId) {

    this.service.getCollaborators(customerId).subscribe(res => {
      if (res != null) {
        this.collaboratorsList = res.data.collaborators;
      }
    });
  }
}
