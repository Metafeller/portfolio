import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { WindowService } from '../window.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';



interface Review {
  image: string;
  nameKey: string;
  positionKey: string;
  textKey: string;
  rating: number; // z. B. 4.5
}

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, TranslateModule],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.scss',
})
export class ReviewsComponent {

  faStar = faStar;
  faStarHalfAlt = faStarHalfAlt;

  // showFullText: number | null = null; // Track the index of the expanded text
  // isMobileView = false; // Responsive check for viewports

  currentIndex = 0;
  showFullText: number | null = null; // Track the index of the expanded text
  isMobileView = false; // Responsive check for viewports

  constructor(
    private windowService: WindowService, 
    private translate: TranslateService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.checkViewport();
  }

  reviews: Review[] = [
    {
      image: '/images/team/marc-braun-github.jpg',
      nameKey: 'reviews.marc.name',
      positionKey: 'reviews.marc.position',
      textKey: 'reviews.marc.text',
      rating: 5,
    },
    {
      image: '/images/team/lyonel-berzen-github.png',
      nameKey: 'reviews.lyonel.name',
      positionKey: 'reviews.lyonel.position',
      textKey: 'reviews.lyonel.text',
      rating: 5,
    },
    {
      image: '/images/team/fabion-latifi-github.jpg',
      nameKey: 'reviews.fabion.name',
      positionKey: 'reviews.fabion.position',
      textKey: 'reviews.fabion.text',
      rating: 4.5,
    },
    {
      image: '/images/team/marc-braun-style.png',
      nameKey: 'reviews.marc2.name',
      positionKey: 'reviews.marc2.position',
      textKey: 'reviews.marc2.text',
      rating: 5,
    },
    {
      image: '/images/team/lyonel-berzen-github.png',
      nameKey: 'reviews.lyonel2.name',
      positionKey: 'reviews.lyonel2.position',
      textKey: 'reviews.lyonel2.text',
      rating: 4,
    },
    {
      image: '/images/team/fabion-latifi-github.jpg',
      nameKey: 'reviews.fabion2.name',
      positionKey: 'reviews.fabion2.position',
      textKey: 'reviews.fabion2.text',
      rating: 4.5,
    },
  ];

  @HostListener('window:resize')
  checkViewport() {
    if (isPlatformBrowser(this.platformId)) {
      requestAnimationFrame(() => {
      this.isMobileView = this.windowService.isMobile();
    });
   }
  }

  // get currentTransform(): string {
  //   return `translateX(calc(-100% * ${this.currentIndex}))`;
  // }

  get currentTransform(): string {
    return this.isMobileView
      ? `translateX(calc(-103% * ${this.currentIndex}))`
      : `translateX(calc(-100% * ${this.currentIndex}))`;
  }

  goToPreviousReview(): void {
    this.currentIndex =
      (this.currentIndex - 1 + this.reviews.length) % this.reviews.length;
  }

  goToNextReview(): void {
    this.currentIndex = (this.currentIndex + 1) % this.reviews.length;
  }

  navigateToReview(index: number): void {
    this.currentIndex = index;
  }

  isActive(index: number): boolean {
    return this.currentIndex === index;
  }

  getStarArray(rating: number): { full: boolean }[] {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push({ full: rating >= i });
    }
    return stars;
  }

  expandText(index: number): void {
    this.showFullText = index;
  }

  collapseText(): void {
    this.showFullText = null;
  }

  getClassesForCard(index: number): string {
    if (index === this.currentIndex) {
      return 'review-card active';
    }
    return 'review-card inactive';
  }

  // um die Performance zu verbessern, wenn es mehrere Bewertungen gibt
  trackByIndex(index: number, review: Review): number {
    return index;
  }  

  getTranslatedTextLength(key: string): number {
    const translated = this.translate.instant(key);
    return translated?.length || 0;
  }
  
}

