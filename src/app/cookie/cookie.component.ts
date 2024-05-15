import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service'; 

@Component({
  selector: 'app-cookie',
  templateUrl: './cookie.component.html',
  styleUrl: './cookie.component.css'
})


export class CookieComponent {
  cookiesAccepted: boolean = false;
  cookiesAsked: boolean = false;
 
  
  constructor(private cookieService: CookieService) {
    this.cookiesAsked = this.cookieService.get('cookieConsent') === 'true';
    this.cookiesAccepted = this.cookieService.get('cookieConsent') === 'true';
  }

  cookiesAcceptedreq() {
    this.cookieService.set('cookieConsent', 'true');
    this.cookiesAsked = true;
  }

  cookiesDeniedreq() {
    this.cookieService.set('cookieConsent', 'false');
    this.cookiesAsked = true;
  }
}