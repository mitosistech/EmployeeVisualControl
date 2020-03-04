import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-managers',
  templateUrl: './managers.component.html',
  styleUrls: ['./managers.component.scss']
})
export class ManagersComponent implements OnInit {

  constructor(public router: Router) { }
  public userId;
  ngOnInit() {
    this.userId = localStorage.getItem("loginUserId");
  }
  routeToHome() {
    this.router.navigate(["/selectCompany/" + this.userId]);
  }
  logout() {
    localStorage.clear();
    this.router.navigate(["/login"]);
  }
}
