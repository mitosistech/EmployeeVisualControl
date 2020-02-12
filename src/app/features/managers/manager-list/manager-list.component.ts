import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SelectcompanyService } from '../../auth/selectcompany/selectcompany.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-manager-list',
  templateUrl: './manager-list.component.html',
  styleUrls: ['./manager-list.component.scss']
})
export class ManagerListComponent implements OnInit {

  constructor(public router: Router, private service: SelectcompanyService, private toastr: ToastrService) { }
  public managerList = [];
  public loaderFlag = false;
  ngOnInit() {
    this.getManagerList();
  }
  routeToManagerCreation() {
    this.router.navigate(["/managers/addManagers/" + 0]);
  }
  routeToEditManger(id) {
    this.router.navigate(["/managers/addManagers/" + id]);
  }

  getManagerList() {
    let data = {};
    this.loaderFlag = true;
    this.service.getAllManager(data).subscribe(res => {
      this.loaderFlag = false;
      let respose = JSON.parse(res);
      if (respose) {
        this.managerList = respose.data.managers;
      }
    });
  }

  deleteManager(id) {
    this.service.deleteManager(id).subscribe(res => {
      if (res) {
        this.toastr.success("Gerente excluído com sucesso");
        this.getManagerList();
      }
    });
  }
}
