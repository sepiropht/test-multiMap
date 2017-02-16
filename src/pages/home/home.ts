import { Component, ViewChild, ElementRef } from '@angular/core';
import {
  GoogleMap,
  GoogleMapsLatLng,
  GoogleMapsMarkerOptions,
  GoogleMapsEvent,
  GoogleMapsMarker,
  Geolocation
} from "ionic-native";
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('mapCanvas') mapElement: ElementRef;
  public map: GoogleMap;
  public mapEle
  constructor() { }

  // Load map only after view is initialize
  ngAfterViewInit() {
    this.loadMap();
  }
  ionViewWillEnter() {

  }

  ionViewDidEnter() {
    this.loadMap();
    if (this.map) this.map.setVisible(true)
  }
  loadMap() {
    this.mapEle = this.mapElement.nativeElement;
    let myStyles = [
      {
        featureType: "poi",
        elementType: "labels",
        stylers: [
          { visibility: "off" }
        ]
      }
    ];
    let options = {
      'controls': {
        'compass': true,
        'myLocationButton': true,
        'indoorPicker': true
      },
      'styles': myStyles
    };

    this.map = new GoogleMap(this.mapEle, options);


    this.map.on(GoogleMapsEvent.MAP_READY).subscribe(_ => {

      this.mapEle.classList.add('show-map');
    })














  }
  ionViewWillLeave() {
    this.mapEle.classList.remove('show-map');
    this.map.setVisible(false)
  }

  loadMapBis() {
    // make sure to create following structure in your view.html file
    // and add a height (for example 100%) to it, else the map won't be visible
    // <ion-content>
    //  <div #map id="map" style="height:100%;"></div>
    // </ion-content>

    // create a new map by passing HTMLElement
    let element: HTMLElement = document.getElementById('mapCanvas');

    let map = new GoogleMap(element);

    // listen to MAP_READY event
    map.one(GoogleMapsEvent.MAP_READY).then(() => console.log('Map is ready!'));

    // create LatLng object
    let ionic: GoogleMapsLatLng = new GoogleMapsLatLng(43.0741904, -89.3809802);

    // create CameraPosition
    let position = {
      target: ionic,
      zoom: 18,
      tilt: 30
    };

    // move the map's camera to position
    map.moveCamera(position);

    // create new marker
    let markerOptions: GoogleMapsMarkerOptions = {
      position: ionic,
      title: 'Ionic'
    };

    map.addMarker(markerOptions)
      .then((marker: GoogleMapsMarker) => {
        marker.showInfoWindow();
      });
  }

}
