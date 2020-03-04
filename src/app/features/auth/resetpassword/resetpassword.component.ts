import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent implements OnInit {
  public resetModel = {};
  private uniqueId;
  public loaderFlag = false;
  constructor(private service: LoginService, public router: Router, private toastr: ToastrService, private route: ActivatedRoute) { }
  ngOnInit() {
    this.uniqueId = this.route.snapshot.paramMap.get('uniqueId');
  }

  resetPassword(data) {
    let request = {
      "password": data.password,
      "confirmPassword": data.confirmPassword,
      "uId": this.uniqueId
    };

    if (data.password != data.confirmPassword) {
      this.toastr.error("A senha e a confirmação da senha não correspondem");
      return;
    }
    // request = data;
    //request.uId = this.uniqueId;
    this.loaderFlag = true;
    this.service.resetPassword(request).subscribe(res => {
      //let result = JSON.parse(res);
      this.loaderFlag = false;
      if (res) {
        this.toastr.success("redefinição de senha com sucesso");
        this.router.navigate(["/login"]);
      } else {
        this.toastr.error("falha na redefinição de senha");
      }

    });
  }
}
