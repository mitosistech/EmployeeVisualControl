import { Component, OnInit } from '@angular/core';
import { VisualcontrolService } from '../../visualcontrol/visualcontrol.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-managers',
  templateUrl: './add-managers.component.html',
  styleUrls: ['./add-managers.component.scss']
})
export class AddManagersComponent implements OnInit {

  public managerModel = {};
  constructor(private service: VisualcontrolService, private toastr: ToastrService, public router: Router) { }
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
