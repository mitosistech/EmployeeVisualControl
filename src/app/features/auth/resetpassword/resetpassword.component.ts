import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent implements OnInit {
public resetModel={};
  constructor(private service: LoginService, public router: Router,private toastr: ToastrService) { }
  ngOnInit() {
  }

  resetPassword(data){
    this.service.resetPassword(data).subscribe(res => {
      let result = JSON.parse(res);
    });
  }
}
