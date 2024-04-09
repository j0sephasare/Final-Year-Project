/// <reference types="@types/googlemaps" />
import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
declare var google: any;

@Component({
  selector: 'app-localgyms',
  templateUrl: './localgyms.page.html',
  styleUrls: ['./localgyms.page.scss'],
})
export class LocalgymsPage implements OnInit {
  map?: google.maps.Map;
  userMarker?: google.maps.Marker; //
  ngOnInit() {
    this.loadMap();
  }

  // Load the map
  loadMap() {
    const mapOptions: google.maps.MapOptions = {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 15,
    };

    const mapElement = document.getElementById('map');
    if (mapElement) {
      this.map = new google.maps.Map(mapElement, mapOptions);
      this.setCurrentPosition();
    } else {
      console.error('Map element not found');
    }
  }

  // Set the current position on the map
  setCurrentPosition() {
    const options = {
      enableHighAccuracy: true, // Use high accuracy
      timeout: 10000,          // Maximum time before timeout
      maximumAge: 0            // Accept only the freshest location, not cached
    };

    Geolocation.getCurrentPosition(options).then(
      (position) => {
        const currentPos = new google.maps.LatLng(
          position.coords.latitude,
          position.coords.longitude
        );

        // If the map is already loaded, set its center to the current position
        if (this.map) {
          this.map.setCenter(currentPos);
          // You can also place a marker at the user's current position if desired
          if (this.userMarker) {
            this.userMarker.setPosition(currentPos);
          } else {
            this.userMarker = new google.maps.Marker({
              position: currentPos,
              map: this.map,
              title: 'Your Location',
            });
          }
        }

        // If you want to display local gyms after setting the position, call that method here
        this.displayLocalGyms(currentPos);
      },
      (err) => {
        console.error('Could not get current position', err);
      }
    );
  }
  // Display local gyms on the map
  displayLocalGyms(position: google.maps.LatLng) {
    const service = new google.maps.places.PlacesService(this.map as google.maps.Map);
    const request: google.maps.places.PlaceSearchRequest = {
      location: position,
      radius: 5000, // Search within 5km radius
      type: 'gym', // Corrected to a single string
    };
  
    service.nearbySearch(request, (results: google.maps.places.PlaceResult[], status: google.maps.places.PlacesServiceStatus) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && results) {
        results.forEach((place: google.maps.places.PlaceResult) => {
          if (!place.geometry || !place.geometry.location) return;
  
          new google.maps.Marker({
            map: this.map,
            position: place.geometry.location,
          });
        });
      }
    });
  }
}
