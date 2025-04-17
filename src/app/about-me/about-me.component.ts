import { Component, AfterViewInit, Inject, PLATFORM_ID, Renderer2, ElementRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.scss'
})
export class AboutMeComponent implements AfterViewInit {

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private renderer: Renderer2,
    private elRef: ElementRef
  ) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.observeElements(); // Beste Stelle für DOM-Animationen!
    }
  }

  observeElements(): void {
    const elements = this.elRef.nativeElement.querySelectorAll(
      '.about-me-image-wrapper, .about-me-text, .about-me-box li'
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.renderer.addClass(entry.target, 'in-view');
            observer.unobserve(entry.target); // Einmal auslösen
          }
        });
      },
      { threshold: 0.3 }
    );

    elements.forEach((el: HTMLElement) => observer.observe(el));
  }
}
