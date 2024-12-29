import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WindowService {
  get nativeWindow(): Window | null {
    return typeof window !== 'undefined' ? window : null;
  }
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

  constructor() { }
}
