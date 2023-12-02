/// <reference types="@types/googlemaps" />
import { Component, OnInit } from '@angular/core';

declare var google: any;

@Component({
  selector: 'app-localgyms',
  templateUrl: './localgyms.page.html',
  styleUrls: ['./localgyms.page.scss'],
})
export class LocalgymsPage implements OnInit {
  map: google.maps.Map | undefined;

  ngOnInit(): void {
    this.loadGoogleMapsScript().then(() => {
      this.getCurrentLocation().then((location) => {
        this.initializeMap(location);
        this.showNearbyGyms(location);
      });
    });
  }

  private loadGoogleMapsScript(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAPlvJpDTkp5wsQXYtbwXI_QwcLjYh48Mg&libraries=places`;
      script.async = true;
      script.onload = () => resolve();
      script.onerror = (error) => reject(error);
      document.head.appendChild(script);
    });
  }

  private getCurrentLocation(): Promise<google.maps.LatLngLiteral> {
    return new Promise<google.maps.LatLngLiteral>((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userLocation: google.maps.LatLngLiteral = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            resolve(userLocation);
          },
          (error) => reject(error),
          { enableHighAccuracy: true }
        );
      } else {
        reject(new Error('Geolocation is not supported by this browser.'));
      }
    });
  }

  private initializeMap(center: google.maps.LatLngLiteral): void {
    this.map = new google.maps.Map(document.getElementById('map')!, {
      center,
      zoom: 15,
    });
  }

  private showNearbyGyms(center: google.maps.LatLngLiteral): void {
    const request = {
      location: center,
      radius: 5000, // You can adjust this radius as needed
      type: 'gym',
    };

    const placesService = new google.maps.places.PlacesService(this.map!);

    placesService.nearbySearch(request, (results: any, status: any) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (const place of results) {
          this.createMarker(place);
        }
      }
    });
  }

  private createMarker(place: any): void {
    if (!this.map) return;

    const marker = new google.maps.Marker({
      map: this.map,
      position: place.geometry.location,
      title: place.name,
    });

    // You can add more details or customize the markers as needed
  }
}
