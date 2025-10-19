import { Component, OnInit, Inject, PLATFORM_ID, AfterViewInit, OnDestroy } from '@angular/core';
import { FooterConfig, FooterConfigService } from './footer.config.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ButtonComponent } from '../button/button.component';
import { ScrollService } from '../../services/scroll.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AutoplayKickDirective } from '../directives/autoplay-kick.directive';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, ButtonComponent, TranslateModule, AutoplayKickDirective],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnInit, AfterViewInit, OnDestroy {
  config!: FooterConfig;
  logoHover: boolean = false;
  private observer: IntersectionObserver | null = null;

  constructor(
  private footerConfigService: FooterConfigService,
  private translate: TranslateService,
  @Inject(PLATFORM_ID) private platformId: Object,
  public scrollService: ScrollService   // 🔸 hier "public"
  ) {}


  ngOnInit(): void {
    this.config = this.footerConfigService.getFooterConfig();
  }
  
    ngAfterViewInit(): void {
      if (isPlatformBrowser(this.platformId)) {
        this.observeElements(); // Beste Stelle für DOM-Animationen!
      }
    }
    
    ngOnDestroy(): void {
      if (this.observer) {
        this.observer.disconnect();
      }
  }
  

  navigateTo(section: string) {
    this.scrollService.navigateToSection(section);  // ScrollService nutzen
  }

  // Funktion zum Öffnen externer Seiten
  redirectToExternalSite(url: string) {
    window.open(url, '_blank');
  }

  /**
   * Initialisiert den IntersectionObserver und beobachtet alle Slide-In-Elemente
   */
  observeElements() {
    const elements = document.querySelectorAll('.slide-in-left, .slide-in-right');

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            this.observer?.unobserve(entry.target); // Nur 1x animieren
          }
        });
      },
      {
        threshold: 0.3 // Sichtbarkeits-Schwelle
      }
    );

    elements.forEach((el) => this.observer?.observe(el));
  }

}
