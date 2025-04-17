import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ScrollService } from '../services/scroll.service';
import { TranslateModule } from '@ngx-translate/core';
import { 
  AfterViewInit, 
  ElementRef, 
  Inject, 
  PLATFORM_ID, 
  Renderer2 } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';


@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent implements AfterViewInit {

  constructor(
    private scrollService: ScrollService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private renderer: Renderer2,
    private elRef: ElementRef
  ) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.observeElements();
    }
  }

  observeElements(): void {
    const elements = this.elRef.nativeElement.querySelectorAll('.slide-in-left, .slide-in-right, .fade-in');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.renderer.addClass(entry.target, 'in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    elements.forEach((el: HTMLElement) => observer.observe(el));
  }

  navigateTo(section: string) {
    this.scrollService.navigateToSection(section);
  }

  // Methode für das Wechseln des Icons bei Hover
  changeIconToWhite(id: string) {
    const element = document.getElementById(id) as HTMLImageElement;
    if (element) {
      element.src = `./../icons/social/${id}-white.svg`;
    }
  }

  // Methode für das Zurücksetzen des Icons, wenn die Maus weg ist
  resetIcon(id: string) {
    const element = document.getElementById(id) as HTMLImageElement;
    if (element) {
      element.src = `./../icons/social/${id}.svg`;
    }
  }

}
