import { Component, OnInit } from '@angular/core';
import { VisualcontrolService } from '../visualcontrol.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { SelectcompanyService } from '../../auth/selectcompany/selectcompany.service';

@Component({
  selector: 'app-addmanager',
  templateUrl: './addmanager.component.html',
  styleUrls: ['./addmanager.component.scss']
})
export class AddmanagerComponent implements OnInit {
  public managerModel = {};
  public companyList = [];
  constructor(private service: VisualcontrolService, private toastr: ToastrService, public router: Router, private selectCompanyService: SelectcompanyService) { }

  ngOnInit() {
  }

  createManager(data) {
    data.businessUnitId = localStorage.getItem("businessid");
    this.service.createManager(data).subscribe(res => {
      if (res != null) {
        this.toastr.success("Gerente de sucesso criado");
        this.router.navigate(["/selectCompany"]);
      } else {
        this.toastr.error("Falhou");
      }
    });
  }


}
