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
    // request = data;
    //request.uId = this.uniqueId;
    this.service.resetPassword(request).subscribe(res => {
      //let result = JSON.parse(res);
      if (res) {
        this.router.navigate(["/"]);
      }

    });
  }
}
