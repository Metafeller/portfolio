import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {

  constructor(private router: Router) {}

  /**
   * Scrollt zu einem HTML-Element mit der angegebenen ID
   */
  scrollToElement(id: string) {
    setTimeout(() => {  // Ein kleines Timeout, damit Angular die Seite richtig lädt
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100); // Verzögerung für Smooth Scroll nach Navigation
  }

  /**
   * Navigiert zur angegebenen Route und scrollt danach zu einem Element
   */
  navigateToSection(route: string, fragment?: string) {
    this.router.navigate([route]).then(() => {
      if (fragment) {
        this.scrollToElement(fragment);
      } else {
        this.scrollToElement(route);  // Scrollt direkt zur Sektion
      }
    });
  }
}


