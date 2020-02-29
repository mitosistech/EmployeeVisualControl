import { Component, OnInit } from '@angular/core';
import { VisualcontrolService } from '../../visualcontrol/visualcontrol.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { SelectcompanyService } from '../../auth/selectcompany/selectcompany.service';

@Component({
  selector: 'app-add-managers',
  templateUrl: './add-managers.component.html',
  styleUrls: ['./add-managers.component.scss']
})
export class AddManagersComponent implements OnInit {

  public managerModel = {};
  public companyList = [];
  public userId: any;
  public managerList = [];
  public editFlag = false;
  public loaderFlag = false;

  constructor(private route: ActivatedRoute, private service: VisualcontrolService, private toastr: ToastrService, public router: Router, private selectCompanyService: SelectcompanyService) { }
  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('userId');
    this.getCompanyList();


  }

  createManager(data) {

    //  data.businessUnitId = localStorage.getItem("businessid");
    if (this.userId != 0) {
      data.id = this.userId;
    }

    if (data.password != data.confirmPassword) {
      this.toastr.error("A senha e a confirmação da senha não correspondem");
      return;
    }
    this.loaderFlag = true;

    if (this.userId != 0) {
      data.password = null;
      data.confirmPassword = null;
    }
    this.service.createManager(data).subscribe(res => {
      this.loaderFlag = false;
      if (res != null) {
        this.toastr.success("Usuário atualizado com sucesso!");
        this.router.navigate(["/managers"]);
      } else {
        this.toastr.error("Falhou");
      }
    });
  }
  getCompanyList() {
    let id = localStorage.getItem("loginUserId");
    this.selectCompanyService.getCompanyListByUserID(id).subscribe(res => {
      this.companyList = res.data.businessUnits;
      if (this.userId != 0) {
        this.editManager(this.userId);
      }
    });
  }

  editManager(userId) {
    this.loaderFlag = true;

    this.selectCompanyService.getByUserId(userId).subscribe(res => {

      let bulist = []
      if (res.data.manager.businessUnitIdList) {
        for (let i = 0; i < res.data.manager.businessUnitIdList.length; i++) {
          bulist.push(res.data.manager.businessUnitIdList[i].toString());
        }
      }
      let model = {
        "firstName": res.data.manager.firstName,
        "lastName": res.data.manager.lastName,
        "userName": res.data.manager.email,
        "businessUnitIdList": bulist,
        "password": res.data.manager.password,
        "confirmPassword": res.data.manager.password

      }

      this.managerModel = model;
      this.loaderFlag = false;
    });
  }

}
