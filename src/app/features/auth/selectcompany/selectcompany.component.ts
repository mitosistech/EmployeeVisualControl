import { Component, OnInit } from '@angular/core';
import { SelectcompanyService } from './selectcompany.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder } from '@angular/forms';
import { VisualcontrolService } from '../../visualcontrol/visualcontrol.service';

@Component({
  selector: 'app-selectcompany',
  templateUrl: './selectcompany.component.html',
  styleUrls: ['./selectcompany.component.scss']
})
export class SelectcompanyComponent implements OnInit {
  public companyList = [];
  public loaderFlag = false;
  public role: any;
  public businessid: any;
  public userName: any;
  public profileImg: any;
  uploadForm: FormGroup;
  public imgFlag = false;
  public logoURL: any;
  public businessUnitName: any;
  constructor(private formBuilder: FormBuilder, private visualcontrolService: VisualcontrolService, private toastr: ToastrService, private service: SelectcompanyService, public router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.uploadForm = this.formBuilder.group({
      profile: ['']
    });
    let userId = this.route.snapshot.paramMap.get('userId');
    this.userName = localStorage.getItem("userName");
    this.profileImg = localStorage.getItem("profileImg");
    this.getCompanyList(userId);

    let str = localStorage.getItem("role");
    if (str == "false") {
      this.role = false;
    } else {
      this.role = true;
    }
  }

  getCompanyList(userId) {
    this.loaderFlag = true;
    this.service.getCompanyListByUserID(userId).subscribe(res => {
      this.companyList = res.data.businessUnits;
      this.loaderFlag = false;
      // this.businessid = this.companyList[0].id;
      console.log(this.companyList);
    });

  }



  selectCompany(businessid) {

    if (businessid) {
      this.loaderFlag = true;
      //validate client count
      this.service.getBusinessUnitCount(businessid).subscribe(res => {
        this.loaderFlag = false;
        if (res.data && res.data.collaboratorsCount && res.data.collaboratorsCount > 0) {
          localStorage.setItem("businessid", businessid);
          this.router.navigate(["/vc/home/" + businessid]);
        } else {
          this.toastr.error("Esta unidade de negócio não possui colaboradores ativos!");
        }
      });
    }
  }

  uploadprofilePictue(event) {
    let loginUserId = localStorage.getItem("loginUserId");
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.get('profile').setValue(file);
    }
    const formData = new FormData();
    formData.append('file', this.uploadForm.get('profile').value);
    this.visualcontrolService.uploadProfileImage(loginUserId, formData).subscribe(res => {
      if (res != null) {
        let result = JSON.parse(res);
        this.toastr.success("Carregamento da imagem do perfil com sucesso");
        localStorage.setItem("profileImg", result.data.imageUrl);
        this.profileImg = result.data.imageUrl;
        this.reload();
      }
    });
  }

  reload() {
    if (this.router.url) {
      this.router.routeReuseStrategy.shouldReuseRoute = function () {
        return false;
      };
    }
  }
  logout() {
    localStorage.clear();
    this.router.navigate(["/login"]);
  }
}
