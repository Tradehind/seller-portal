import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [ApiService]
})

export class AppComponent {
  title = 'seller-portal';
  baseLocation: any;


  constructor(public router: Router, public location: Location) {
    // console.log(location.path())

    this.baseLocation = this.location.path();
  }

}
