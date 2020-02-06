import { Component, OnInit } from "@angular/core";
import { LoginService } from "./login.service";
import { Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  public userModel = {};
  constructor(private service: LoginService, public router: Router, private toastr: ToastrService) { }

  ngOnInit() {

  }

  login(data) {
    if (!data) {
      return;
    }

    this.service.login(data).subscribe(res => {
      let result = JSON.parse(res);

      if (result.data != null) {
        this.toastr.success('sucesso');
        localStorage.setItem("userName", result.data.firstName);
        localStorage.setItem("profileImg", result.data.imageUrl);
        localStorage.setItem("loginUserId", result.data.id);
        if (result.data.superAdmin) {
          this.router.navigate(["/selectCompany"]);
        } else {
          this.router.navigate(["/vc/home/" + result.data.business_unit_id]);
          // localStorage.setItem("companyName", result.employee_name);
        }
      } else {
        this.toastr.error('falha no login, tente novamente');
      }
    });
  }
}
