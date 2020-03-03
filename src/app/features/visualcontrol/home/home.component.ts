import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
// import { google } from "google-maps";
import { VisualcontrolService } from '../visualcontrol.service';
import { ActivatedRoute, Router } from '@angular/router';
import { VisualcontrolComponent } from '../visualcontrol.component';
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  @ViewChild("mapRef", { static: true }) mapElement: ElementRef;
  constructor(private service: VisualcontrolService, private route: ActivatedRoute, public router: Router, private visualcontrolComponent: VisualcontrolComponent) { }
  public locationCoordinates = [];
  public companyId;

  public loaderFlag = false;
  public role: any;
  public companyName: any;
  private removeIdList = [];

  ngOnInit() {
    let businessId = this.route.snapshot.paramMap.get('businessId');
    this.companyId = this.route.snapshot.paramMap.get('businessId');
    let str = localStorage.getItem("role");
    if (str == "false") {
      this.role = false;
    } else {
      this.role = true;
    }
    this.getListOfLocationByBusinessId(businessId);
    // this.renderMap();
  }

  routeToHome() {
    let userId = localStorage.getItem("loginUserId");
    this.router.navigate(["/selectCompany/" + userId]);
  }

  getstate(st) {
    this.router.navigate(["/vc/clients/" + this.companyId + "/" + st]);
    //this.router.navigate(["/vc/clients/"+2+"/"+this.companyId]);
  }


  routeToClientPage(locationId) {
    this.router.navigate(["/vc/clients/" + locationId]);
  }
  getListOfLocationByBusinessId(businessId) {
    this.loaderFlag = true;
    this.service.getLocation(businessId).subscribe(res => {
      if (res.data.locations != null && res.data.locations != null && res.data.locations.length != 0) {
        //  this.visualcontrolComponent.setCompanyLogo(res.data.business.name, res.data.business.logoSmallUrl);
        this.companyName = res.data.business.name;
        localStorage.setItem("companyName", this.companyName);
        for (let i = 0; i < res.data.locations.length; i++) {

          if (res.data.locations[i].address.stateId) {
            var temp = "PM-" + res.data.locations[i].address.stateId;
            var svg = document.getElementById(temp);
            if (res.data.locations[i].status != null && (res.data.locations[i].status.code == 1 || res.data.locations[i].status.code == 2)) {
              svg.setAttribute("fill", "green");
            } else if (res.data.locations[i].status != null && (res.data.locations[i].status.code == 3 || res.data.locations[i].status.code == 7)) {
              svg.setAttribute("fill", "red");

            } else if (res.data.locations[i].status != null && (res.data.locations[i].status.code == 4 || res.data.locations[i].status.code == 8)) {
              svg.setAttribute("fill", "yellow");
            } else if (res.data.locations[i].status != null && (res.data.locations[i].status.code == 5 || res.data.locations[i].status.code == 6)) {
              svg.setAttribute("fill", "gray");
            } else {
              //svg.setAttribute("fill", "black");
              // svg.removeAttribute("circle");
            }
            this.removeIdList.push(temp.trim());
          }
        }
        this.removeCircle(this.removeIdList);
        //  this.loadMap();
        this.loaderFlag = false;
      }
    });

  }

  removeCircle(listIfId) {
    this.service.getStateCode().subscribe(res => {
      //console.log(res.data);
      let tempList = []
      for (let i = 0; i < res.data.length; i++) {
        tempList.push("PM-" + res.data[i].stateCode.trim());
      }

      for (let i = 0; i < tempList.length; i++) {
        if (listIfId.indexOf(tempList[i]) > -1) {

        } else {
          var svg = document.getElementById(tempList[i]);
          if (svg) {
            svg.removeAttribute("cx");
            svg.removeAttribute("cy");
            svg.removeAttribute("r");
          }

        }
        //   }
      }

    });
  }
}
