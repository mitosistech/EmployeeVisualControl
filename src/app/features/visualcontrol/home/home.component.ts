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
    var location = [
      {'name':'AM', 'lat':'-3.117034', 'lon':'-60.025780'},
      {'name':'AC', 'lat':'-9.225730', 'lon':'-70.601231'}
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

    // marker.addListener("click", function() {
    //   infowindow.open(map, marker);
    // });

    var marker, i;
    var map = new window["google"].maps.Map(this.mapElement.nativeElement, {
      center: { lat: -3.117034, lng: -60.025780 },
      zoom: 4,
      disableDefaultUI: true,
      
      styles: [
        {elementType: 'geometry', stylers: [{color: '#a6c3d7'}]},
        {elementType: 'labels.text.stroke', stylers: [{color: '#a6c3d7'}]},
        {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
        
        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [{color: '#7ba7c3'}]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.fill',
          stylers: [{color: '#515c6d'}]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.stroke',
          stylers: [{color: '#7ba7c3'}]
        }
      ]

     });
    for(i = 0; i < location.length; i++){
      console.log(typeof location[i].lat)
      
      marker = new window["google"].maps.Marker({
        position: new google.maps.LatLng(Number(location[i].lat), Number(location[i].lon)),
        map: map
      })

      google.maps.event.addListener(
        marker,
        'click',
        (function(marker, i) {
          return function() {
            infowindow.setContent("<div><a routerLink='/clients'>"+location[i].name+"</a></div>")
            infowindow.open(map, marker)
          }
        })(marker, i)
      )
    }


  };
}
