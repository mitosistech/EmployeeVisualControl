import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { VisualcontrolService } from './visualcontrol.service';
import { ToastrService } from 'ngx-toastr';
import { async } from '@angular/core/testing';

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
  constructor(private toastr: ToastrService, public router: Router, private formBuilder: FormBuilder, private service: VisualcontrolService) { }

  ngOnInit() {
    this.uploadForm = this.formBuilder.group({
      profile: ['']
    });
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

  logout() {
    localStorage.clear();
    this.router.navigate(["/login"]);
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
        //this.setCompanyLogo(null, "https://trellis.co/wp-content/uploads/2015/09/hidden_meanings_facts_within_famous_logos_cover_image.jpg");

      }
    });

  }
}
