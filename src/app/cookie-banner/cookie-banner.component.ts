import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cookie-banner',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cookie-banner.component.html',
  styleUrl: './cookie-banner.component.scss'
})
export class CookieBannerComponent implements OnInit {
  showBanner = false;
  showSettings = false;

  analyticsConsent = true;
  marketingConsent = true;

  localStorageKey = 'cookieConsent';
  private platformId = inject(PLATFORM_ID);

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const consent = localStorage.getItem(this.localStorageKey);
      this.showBanner = !consent;
    }
  }

  acceptAll() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.localStorageKey, JSON.stringify({
        necessary: true,
        analytics: true,
        marketing: true
      }));
      this.showBanner = false;
    }
  }

  rejectAll() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.localStorageKey, JSON.stringify({
        necessary: true,
        analytics: false,
        marketing: false
      }));
      this.showBanner = false;
    }
  }

  openSettings() {
    this.showSettings = true;
  }

  saveSettings() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.localStorageKey, JSON.stringify({
        necessary: true,
        analytics: this.analyticsConsent,
        marketing: this.marketingConsent
      }));
      this.showBanner = false;
      this.showSettings = false;
    }
  }
}
