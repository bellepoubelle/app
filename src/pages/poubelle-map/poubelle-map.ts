import {Address} from "../../models/address";
import {Poubelle} from "../../models/poubelle";
import {AddressService} from "../../providers/address-service";
import {PoubelleService} from "../../providers/poubelle-service";
import {PoubelleReportPage} from "../poubelle-report/poubelle-report";
import {Component, ViewChild, ElementRef} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {NavController, PopoverController} from "ionic-angular";
import leaflet, {MarkerOptions, Icon} from 'leaflet';
import 'leaflet-routing-machine';

declare var L: any;

@Component({
  selector: 'page-map',
  templateUrl: 'poubelle-map.html'
})
export class PoubelleMapPage {
  @ViewChild('map') mapContainer: ElementRef;

  poubelles: Array<Poubelle> = new Array<Poubelle>();
  poubellesPlastic: Array<Poubelle> = new Array<Poubelle>();
  poubellesGlass: Array<Poubelle> = new Array<Poubelle>();
  poubellesAll: Array<Poubelle> = new Array<Poubelle>();
  map: any;

  lat: number = 45.782938;
  lng: number = 4.8760843;

  routing;

  blueIcon: Icon = new L.Icon({
    iconUrl: 'assets/img/leaflet/marker-icon-2x-blue.png',
    shadowUrl: 'assets/img/leaflet/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  redIcon: Icon = new L.Icon({
    iconUrl: 'assets/img/leaflet/marker-icon-2x-red.png',
    shadowUrl: 'assets/img/leaflet/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  greenIcon: Icon = new L.Icon({
    iconUrl: 'assets/img/categories/3.png',
    //iconUrl: 'assets/img/leaflet/marker-icon-2x-green.png',
    shadowUrl: 'assets/img/leaflet/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  orangeIcon: Icon = new L.Icon({
    iconUrl: 'assets/img/leaflet/marker-icon-2x-orange.png',
    shadowUrl: 'assets/img/leaflet/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  yellowIcon: Icon = new L.Icon({
    iconUrl: 'assets/img/categories/2.png',
    //iconUrl: 'assets/img/leaflet/marker-icon-2x-yellow.png',
    shadowUrl: 'assets/img/leaflet/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  violetIcon: Icon = new L.Icon({
    iconUrl: 'assets/img/leaflet/marker-icon-2x-violet.png',
    shadowUrl: 'assets/img/leaflet/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  greyIcon: Icon = new L.Icon({
    iconUrl: 'assets/img/categories/1.png',
    //iconUrl: 'assets/img/leaflet/marker-icon-2x-grey.png',
    shadowUrl: 'assets/img/leaflet/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  blackIcon: Icon = new L.Icon({
    iconUrl: 'assets/img/leaflet/marker-icon-2x-black.png',
    shadowUrl: 'assets/img/leaflet/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  report: string;

  constructor(private elementRef: ElementRef, public popoverCtrl: PopoverController, public navCtrl: NavController, public poubelleService: PoubelleService, public translateService: TranslateService, public addressService: AddressService) {
    this.translateService.get('REPORT').subscribe(value => {this.report = value;});
  }

  ionViewDidEnter() {
    this.poubelleService.getAll()
      .subscribe(
      (result: any) => {
        this.poubelles = result;
      },
      (error: Error) => console.log("Failed to load poubelles: " + error),
      () => this.loadmap()
      );

    this.poubelleService.getAll()
      .map(poubelles => poubelles.filter(poubelle => poubelle.category === 1)).subscribe(
      (result: any) => {
        this.poubellesAll = result;
        console.log(result);


      },

      (error: Error) => console.log("Failed to load poubelles sans tri: " + error),
    );

    this.poubelleService.getAll()
      .map(poubelles => poubelles.filter(poubelle => poubelle.category === 2)).subscribe(
      (result: any) => {
        this.poubellesGlass = result;
        console.log(result);


      },

      (error: Error) => console.log("Failed to load poubelles verres: " + error),
    );

    this.poubelleService.getAll()
      .map(poubelles => poubelles.filter(poubelle => poubelle.category === 3)).subscribe(
      (result: any) => {
        this.poubellesPlastic = result;
        console.log(result);


      },

      (error: Error) => console.log("Failed to load poubelles plastique: " + error),
    );


  }

  ionViewWillUnload() {
    this.map.off();
    this.map.remove();
  }


  // Checkbox functions
  DisplayMapAll(e: any) {
    console.log(e.checked);
  }

  DisplayMarkerGlass(e: any) {
    console.log("Glass is checked");

  }
  DisplayMarkerPaper(e: any) {
    console.log(e.checked);
  }

  loadmap() {
    this.map = leaflet.map("map").fitWorld();
    leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attributions: 'Map data &copy; <a href="https://www.openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18
    }).addTo(this.map);

    this.map.setView(new L.LatLng(this.lat, this.lng), 15);

    // placeholders for the L.marker and L.circle representing user's current position and accuracy    
    var current_position, current_accuracy;
    function onLocationFound(e) {
      this.lat = e.latlng.lat;
      this.lng = e.latlng.lng;
    }

    this.map.on('locationfound', onLocationFound);
    this.map.locate({
      setView: true,
      maxZoom: 16,
      enableHighAccuracy: true,
      watch: true
    });

    for (let poubelle of this.poubelles) {

      let icon: Icon = this.blueIcon;
      let category: string = "";
      if (poubelle.category == 1) {
        icon = this.greyIcon;
        category = "tout"
      } else if (poubelle.category == 2) {
        icon = this.yellowIcon;
        category = "verre"
      } else if (poubelle.category == 3) {
        icon = this.greenIcon;
        category = "recyclage papier/carton/plastique"
      }

      let marker: L.Marker = leaflet.marker([poubelle.latitude, poubelle.longitude], {icon: icon}).addTo(this.map);

      marker.addEventListener("click", (e) => {this.onMarkerClick(e, poubelle, category, marker)});
    }
  }

  onMarkerClick(e, poubelle, category, marker) {

    if (this.routing != null) {
      this.routing.setWaypoints([]);
      this.map.removeControl(this.routing);
    }

    this.addressService.get(poubelle.address).subscribe(
      (address: Address) => {

        let roadnumber: string = "";
        if (address.roadnumber != null && address.roadnumber != "") {
          roadnumber = "<br>" + address.roadnumber;
        }


        var popupButton = "<button class=\"poubelle-link button button-md button-default button-default-md button-md-danger\" data-poubelleId=\"" + poubelle.id + "\" ion-button color=\"danger\"><span class=\"button-inner\">" + this.report + "</span></button>";
        marker.bindPopup("<h1>" + poubelle.fillingLevel + " %</h1><b>" + address.road + "</b>" + roadnumber + "<br>" + address.commune + "<br><br>" + category + "<br><br>" + popupButton).openPopup();

        // add event listener to newly added a.merch-link element
        this.elementRef.nativeElement.querySelector(".poubelle-link")
          .addEventListener('click', (e) => {
            this.reportPoubelle(e.target.getAttribute("data-poubelleId"));
          });
      });

    // Routing
    this.routing = L.Routing.control({
      createMarker: function(i, wp, nWps) {
        if (i === 0) {
          return L.marker(wp.latLng);
        } else {
          return null;
        }
      },
      waypoints: [
        L.latLng(this.lat, this.lng),
        L.latLng(poubelle.latitude, poubelle.longitude)
      ]
    }).addTo(this.map);

  }

  reportPoubelle(id: number) {
    console.log("Poubelle-ID", id);
    var poubelleId = id;
    this.navCtrl.push(PoubelleReportPage, {id: poubelleId});
  }
}


