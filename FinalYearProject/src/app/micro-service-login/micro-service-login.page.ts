import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
@Component({
  selector: 'app-micro-service-login',
  templateUrl: './micro-service-login.page.html',
  styleUrls: ['./micro-service-login.page.scss'],
})
export class MicroServiceLoginPage implements OnInit {

  constructor(public _auth:AuthService) { }

  ngOnInit() {
  }

}
