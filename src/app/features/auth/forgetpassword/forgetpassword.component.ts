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

  constructor(private service: LoginService, public router: Router,private toastr: ToastrService) { }

  ngOnInit() {
  }

  forgotPassword(data){
    this.service.verifyMail(null,data).subscribe(res => {
      let result = JSON.parse(res);
    });
  }
}
