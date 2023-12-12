import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-challenges',
  templateUrl: './challenges.page.html',
  styleUrls: ['./challenges.page.scss'],
})
export class ChallengesPage implements OnInit {

  constructor(private router: Router,) { }

  ngOnInit() {
  }
  openRonaldoChallenge() {
    this.router.navigate(['/ronaldo']);
  }

}
