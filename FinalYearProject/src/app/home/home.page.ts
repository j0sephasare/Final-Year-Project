import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor() { }

  ngOnInit() {
    this.updateDateTime();
    setInterval(() => this.updateDateTime(), 1000);
  }

  updateDateTime() {
    const now = new Date();
    const dateTimeString = now.toLocaleString(); // Adjust format as needed
    const dateTimeElement = document.getElementById('currentDateTime');
  
    if (dateTimeElement) {
      dateTimeElement.innerText = dateTimeString;
    }
  }
  
}
