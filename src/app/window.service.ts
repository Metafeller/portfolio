import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class WindowService {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  get nativeWindow(): Window | null {
    return isPlatformBrowser(this.platformId) ? window : null;
  }

  // get nativeWindow(): Window | null {
  //   return typeof window !== 'undefined' ? window : null;
  // }

  isMobile(): boolean {
    return this.nativeWindow ? this.nativeWindow.innerWidth <= 767 : false; // Mobile bis 767px
  }

  isTablet(): boolean {
    return this.nativeWindow
      ? this.nativeWindow.innerWidth > 767 && this.nativeWindow.innerWidth <= 1024
      : false; // Tablet 768px bis 1024px
  }

  isDesktop(): boolean {
    return this.nativeWindow ? this.nativeWindow.innerWidth > 1024 : false; // Desktop über 1024px
  }

}
