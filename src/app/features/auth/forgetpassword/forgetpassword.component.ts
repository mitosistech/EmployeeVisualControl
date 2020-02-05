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

  constructor(private service: LoginService, public router: Router, private toastr: ToastrService) { }

  ngOnInit() {
  }

  forgotPassword(userName) {
    this.service.verifyMail(null, userName).subscribe(res => {
      let result = JSON.parse(res);
      this.toastr.success("Link sent your mail..! Please check it");
    });
  }
}
