import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { google } from "google-maps";
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
  ngOnInit() {
    let businessId = this.route.snapshot.paramMap.get('businessId');
    this.companyId = this.route.snapshot.paramMap.get('businessId');
    this.getListOfLocationByBusinessId(businessId);
    this.renderMap();
  }

  getstate(st) {
    // this.router.navigate(["/vc/clients/" + 2 + "/" + st]);
    this.router.navigate(["/vc/clients/"+2+"/"+this.companyId]);
  }


  routeToClientPage(locationId) {
    this.router.navigate(["/vc/clients/" + locationId]);
  }
  getListOfLocationByBusinessId(businessId) {


    // var svg1 = document.getElementById('PM-AC');
    // var svg2 = document.getElementById('PM-RO');
    // var svg3 = document.getElementById('PM-RR');
    // var svg4 = document.getElementById('PM-PA');
    // svg1.setAttribute("fill", "red");
    // svg2.setAttribute("fill", "red");
    // svg3.setAttribute("fill", "red");
    // svg4.setAttribute("fill", "red");

    // var svg5 = document.getElementById('PM');
    // svg5.setAttribute("fill", "green");


    this.service.getLocation(businessId).subscribe(res => {
      if (res.data.locations != null && res.data.locations != null && res.data.locations.length != 0) {
        this.visualcontrolComponent.setCompanyLogo(res.data.business.name, res.data.business.logoSmallUrl);
        for (let i = 0; i < res.data.locations.length; i++) {
          let location = {
            name: res.data.locations[i].address.stateName,
            lat: res.data.locations[i].address.latitude,
            lon: res.data.locations[i].address.longitude,
            id: res.data.locations[i].id,
            status: res.data.locations[i].status
          };
          this.locationCoordinates.push(location);
        }

        this.loadMap();
      }
    });

  }

  renderMap() {
    window["initMap"] = () => {
      this.loadMap();
    };
    if (!window.document.getElementById("google-map-script")) {
      var s = window.document.createElement("script");
      s.id = "google-map-script";
      s.type = "text/javascript";
      s.src =
        "https://maps.googleapis.com/maps/api/js?key=AIzaSyBE_a4LAyqd7u3_RR9sHEiFYcdwbQ45aNo&amp;callback=initMap";

      window.document.body.appendChild(s);
    } else {
      this.loadMap();
    }
  }

  loadMap = () => {

    var location = [
      { 'name': 'AM', 'lat': '-3.117034', 'lon': '-60.025780' },
      { 'name': 'AC', 'lat': '-9.225730', 'lon': '-70.601231' }
    ]

    var contentString =
      '<div id="content">' +
      '<div id="siteNotice">' +
      "</div>" +
      '<h3 id="thirdHeading" class="thirdHeading">W3path.com</h3>' +
      '<div id="bodyContent">' +
      "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>" +
      "</div>" +
      "</div>";

    var infowindow = new window["google"].maps.InfoWindow({
      content: contentString
    });




    var marker, i;
    var map = new window["google"].maps.Map(this.mapElement.nativeElement, {
      center: { lat: -23.591311, lng: -46.672307 },
      zoom: 11,
      disableDefaultUI: true,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: [
        { elementType: 'geometry', stylers: [{ color: '#a6c3d7' }] },
        { elementType: 'labels.text.stroke', stylers: [{ color: '#a6c3d7' }] },
        { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },

        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [{ color: '#7ba7c3' }]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#515c6d' }]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.stroke',
          stylers: [{ color: '#7ba7c3' }]
        }
      ]

    });
    for (i = 0; i < this.locationCoordinates.length; i++) {
      console.log(typeof this.locationCoordinates[i].lat)

      marker = new window["google"].maps.Marker({
        position: new google.maps.LatLng(Number(this.locationCoordinates[i].lat), Number(this.locationCoordinates[i].lon)),
        map: map
      })
      var infowindow = new window["google"].maps.InfoWindow();

      //  infowindow.setContent("<div><a href='http://204.27.60.26:8080/evc/vc/clients/" + this.locationCoordinates[i].id + "'>" + this.locationCoordinates[i].name + "</a></div>")

      infowindow.setContent("<div class='mapinfowindow'><a style='font-weight:600; color:#000000; ' href='http://204.27.60.26:8080/evc/#/vc/clients/" + this.locationCoordinates[i].id + "'><span style=' width:10px; height:10px; border-radius:50%; margin-right:3px; display:inline-block;' class='status" + this.locationCoordinates[i].status + "'></span>" + this.locationCoordinates[i].name + "</a></div>")

      infowindow.open(map, marker)
      marker.setVisible(false);
      // google.maps.event.addListener(
      //   marker,
      //   'click',
      //   (function (marker, i) {
      //     return function () {
      //       infowindow.setContent("<div><a routerLink='/clients'>" + this.locationCoordinates[i].name + "</a></div>")
      //       infowindow.open(map, marker)
      //     }
      //   })(marker, i)
      // )
    }

  };
}
