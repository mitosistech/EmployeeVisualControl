import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { VisualcontrolService } from './visualcontrol.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-visualcontrol',
  templateUrl: './visualcontrol.component.html',
  styleUrls: ['./visualcontrol.component.scss']
})
export class VisualcontrolComponent implements OnInit {
  public businessUnitName: any;
  uploadForm: FormGroup;
  public imgFlag = false;
  public logoURL: any;
  public userName: any;
  public profileImg: any;
  constructor(private toastr: ToastrService, public router: Router, private formBuilder: FormBuilder, private service: VisualcontrolService) { }

  ngOnInit() {
    this.uploadForm = this.formBuilder.group({
      profile: ['']
    });
    this.getCompanyLogo();
    this.userName = localStorage.getItem("userName");
    this.profileImg = localStorage.getItem("profileImg");
  }

  setCompanyLogo(name, logo) {
    if (logo) {
      this.imgFlag = true;
      this.logoURL = logo;
    } else {
      this.businessUnitName = name;
    }
  }

  navigateToCreateManager() {
    let businessid = localStorage.getItem("businessid");
    this.router.navigate(["/vc/addmanager/" + businessid]);
  }


  uploadCompanyLogo(event) {
    let businessid = localStorage.getItem("businessid");
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.get('profile').setValue(file);
    }

    const formData = new FormData();
    formData.append('file', this.uploadForm.get('profile').value);

    this.service.uploadCompanyLogo(businessid, formData).subscribe(res => {
      if (res != null) {
        this.toastr.success("Logotipo enviado com sucesso");
        this.setCompanyLogo(null, res.data.business.logoUrl);
      }
    });

  }


  getCompanyLogo() {
    let businessid = localStorage.getItem("businessid");
    this.service.getCompanyLogo(businessid).subscribe(res => {
      if (res != null) {
        //this.toastr.success("Logotipo enviado com sucesso");
        this.setCompanyLogo(res.data.business.name, res.data.business.logoUrl);
      }
    });
  }

  uploadprofilePictue(event) {
    let loginUserId = localStorage.getItem("loginUserId");
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.get('profile').setValue(file);
    }
    const formData = new FormData();
    formData.append('file', this.uploadForm.get('profile').value);
    this.service.uploadProfileImage(loginUserId, formData).subscribe(res => {
      if (res != null) {
        let result = JSON.parse(res);
        this.toastr.success("Carregamento da imagem do perfil com sucesso");
        localStorage.setItem("profileImg", result.data.imageUrl);
        this.profileImg = result.data.imageUrl;
        this.reload();
      }
    });
  }
  logout() {
    localStorage.clear();
    this.router.navigate(["/login"]);
  }

  reload() {
    if (this.router.url) {
      this.router.routeReuseStrategy.shouldReuseRoute = function () {
        return false;
      };
    }
  }
}
