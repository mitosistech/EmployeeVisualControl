import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  @ViewChild("mapRef", { static: true }) mapElement: ElementRef;
  constructor() {}
 
  ngOnInit() {
    this.renderMap();
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
    var map = new window["google"].maps.Map(this.mapElement.nativeElement, {
      center: { lat: 13.083333, lng: 80.283333 },
      zoom: 8
    });

    var marker = new window["google"].maps.Marker({
      position: { lat: 13.083333, lng: 80.283333 },
      map: map,
      title: "Compnay state wise",
      draggable: true,
      animation: window["google"].maps.Animation.DROP
    });

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

    marker.addListener("click", function() {
      infowindow.open(map, marker);
    });
  };
}
