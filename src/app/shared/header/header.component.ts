import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WindowService } from '../../window.service';
import { ScrollService } from '../../services/scroll.service';
import { TranslateService } from '@ngx-translate/core'; // ✅ NEU
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  menuOpen = false;
  screenWidth: number = 0;
  currentLang = 'de'; // Aktive Sprache (Standard: Deutsch)

  constructor(
    private windowService: WindowService, 
    private scrollService: ScrollService,
    private translate: TranslateService, // ✅ NEU
    @Inject(PLATFORM_ID) private platformId: Object // ✅ hinzufügen!
  ) {}

  ngOnInit() {
    this.setScreenWidth();

    if (isPlatformBrowser(this.platformId)) {
      const savedLang = localStorage.getItem('lang');
      this.currentLang = savedLang || 'de';
      this.translate.use(this.currentLang); // Sprache setzen
    } else {
      // Fallback z.B. für Server oder Tests
      this.currentLang = 'de';
      this.translate.use('de');
    }

    const windowRef = this.windowService.nativeWindow;
    if (windowRef) {
      this.screenWidth = windowRef.innerWidth;
    }
  }

  setScreenWidth() {
    const windowRef = this.windowService.nativeWindow;
    if (windowRef) {
      this.screenWidth = windowRef.innerWidth;
    }
  }

  switchLanguage(lang: string) {
    this.currentLang = lang;
    this.translate.use(lang);
    localStorage.setItem('lang', lang); // Sprache speichern
  }

  getLangClass(lang: string): string {
    return this.currentLang === lang ? 'language-btn active' : 'language-btn';
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    const windowRef = this.windowService.nativeWindow;
    if (windowRef) {
      this.screenWidth = event.target.innerWidth;
    }
  }

  onMouseOver() {
    const logo = document.getElementById('header-logo') as HTMLImageElement;
    if (logo) {
      logo.src = './../logos/aya/9.svg';
    }
  }

  onMouseLeave() {
    const logo = document.getElementById('header-logo') as HTMLImageElement;
    if (logo) {
      logo.src = './../logos/aya/11.svg';
    }
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  navigateTo(section: string) {
    this.scrollService.navigateToSection(section);  // Nutze den neuen ScrollService zum Navigieren
  }


  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const burgerMenu = document.getElementById('burger-menu');
    const navbar = document.querySelector('.navbar.open');
    if (
      this.menuOpen &&
      burgerMenu &&
      navbar &&
      !burgerMenu.contains(event.target as Node) &&
      !navbar.contains(event.target as Node)
    ) {
      this.menuOpen = false; // Menü schließen, wenn außerhalb geklickt wird
    }
  }

}
