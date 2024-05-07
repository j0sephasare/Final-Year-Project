/// <reference types="@types/googlemaps" />
import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation'; // Import Geolocation from Capacitor

// Declare Google variable to avoid TypeScript errors
declare var google: any;

@Component({
  selector: 'app-localgyms',
  templateUrl: './localgyms.page.html',
  styleUrls: ['./localgyms.page.scss'],
})
export class LocalgymsPage implements OnInit {
  map?: google.maps.Map; // Google Maps map object
  userMarker?: google.maps.Marker; // Marker for user's current position

  ngOnInit() {
    this.loadMap(); // Load map on component initialization
  }

  // Load the map
  loadMap() {
    const mapOptions: google.maps.MapOptions = {
      center: { lat: -34.397, lng: 150.644 }, // Default center coordinates
      zoom: 15, // Default zoom level
    };

    const mapElement = document.getElementById('map'); // Get map element from DOM
    if (mapElement) {
      // Create a new Google Maps instance
      this.map = new google.maps.Map(mapElement, mapOptions);
      this.setCurrentPosition(); // Set user's current position
    } else {
      console.error('Map element not found');
    }
  }

  // Set the current position on the map
  setCurrentPosition() {
    const options = {
      enableHighAccuracy: true, // Enable high accuracy for geolocation
      timeout: 10000, // Set timeout for geolocation request
      maximumAge: 0 // Set maximum age for geolocation data
    };

    // Get current position using Capacitor's Geolocation plugin
    Geolocation.getCurrentPosition(options).then(
      (position) => {
        const currentPos = new google.maps.LatLng(
          position.coords.latitude,
          position.coords.longitude
        );

        // Update map center to user's current position
        if (this.map) {
          this.map.setCenter(currentPos);
          // Update user marker position or create a new marker
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

        // Display local gyms around the user's current position
        this.displayLocalGyms(currentPos);
      },
      (err) => {
        console.error('Could not get current position', err);
      }
    );
  }

  // Display local gyms on the map
  displayLocalGyms(position: google.maps.LatLng) {
    // Create a new PlacesService instance
    const service = new google.maps.places.PlacesService(this.map as google.maps.Map);

    // Define request parameters for nearby search
    const request: google.maps.places.PlaceSearchRequest = {
      location: position, // User's current position
      radius: 5000, // Search within 5km radius
      type: 'gym', // Search for gyms
    };

    // Perform nearby search for gyms
    service.nearbySearch(request, (results: google.maps.places.PlaceResult[], status: google.maps.places.PlacesServiceStatus) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && results) {
        // Iterate over search results and add markers for each gym
        results.forEach((place: google.maps.places.PlaceResult) => {
          if (!place.geometry || !place.geometry.location) return; // Skip if no geometry
          // Add marker for gym
          new google.maps.Marker({
            map: this.map,
            position: place.geometry.location,
          });
        });
      }
    });
  }
}