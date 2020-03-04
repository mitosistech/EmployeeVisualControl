import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.scss']
})
export class ForgetpasswordComponent implements OnInit {
  public loaderFlag = false;
  constructor(private service: LoginService, public router: Router, private toastr: ToastrService) { }

  ngOnInit() {
  }

  forgotPassword(userName) {
    this.loaderFlag = true;
    this.service.verifyMail(null, userName).subscribe(res => {
      this.loaderFlag = false;
      let result = JSON.parse(res);
      this.toastr.success("Foi enviado um e-mail para você reiniciar sua senha!");
      this.router.navigate(['/login']);
    });
  }
}
