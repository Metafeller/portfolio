import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { WindowService } from '../window.service';



interface Review {
  image: string;
  name: string;
  position: string;
  text: string;
  rating: number; // z. B. 4.5
}

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.scss',
})
export class ReviewsComponent {

  faStar = faStar;
  faStarHalfAlt = faStarHalfAlt;

  // showFullText: number | null = null; // Track the index of the expanded text
  // isMobileView = false; // Responsive check for viewports

  reviews: Review[] = [
    {
      image: '/images/team/marc-braun-github.jpg',
      name: 'Marc Braun',
      position: 'Senior UI/UX Designer',
      text: 'Working with Tayfun was extremely productive, inspiring, and tremendously enriching. The chemistry within our team was excellent, and this was clearly reflected in the quality of our projects. Tayfun has a bright future ahead. His boundless motivation and captivating commitment greatly contributed to the positive atmosphere in the team. One can feel his positive aura and the passion he ignites.',
      rating: 5.0,
    },
    {
      image: '/images/team/lyonel-berzen-github.png',
      name: 'Lyonel Berzen',
      position: 'Frontend Developer',
      text: 'I had the pleasure of working with Tayfun Savas Boas on a joint project. His positive attitude and entrepreneurial spirit were real assets to the team, consistently keeping motivation high. Tayfun was characterized by his openness to suggestions for improvement and often brought in fresh ideas. Ty has an eye for detail, and his experience in the branding and marketing industry has been a particular asset.',
      rating: 5.0,
    },
    {
      image: '/images/team/fabion-latifi-github.jpg',
      name: 'Fabion Latifi',
      position: 'Frontend Developer',
      text: 'It was a great pleasure to work with Tayfun Savas Boas Aya. His positive energy and motivational spirit significantly uplifted our team and contributed to our collective success. Tayfun has the innate ability to encourage team members to deliver their best work, consistently adding valuable insights during brainstorming sessions. His innovative thinking and proactive approach were instrumental in driving our projects forward. Furthermore, Tayfun is very detail-oriented and pays attention to the little things that others might overlook.',
      rating: 4.5,
    },
    // Weitere Platzhalter-Reviews
    {
      image: '/images/team/marc-braun-style.png',
      name: 'Marc Braun II',
      position: 'UI/UX Designer',
      text: 'Ty has an extraordinary ability to maintain an overview and act with a goal-oriented approach. Even in crisis situations, he remains calm and solution-oriented. His professional approach and wisdom, especially at such a young age, have deeply impressed me. Tayfun also demonstrates a strong capacity for self-reflection and continuous improvement. I look forward to executing more projects with Tayfun in the future and am convinced that his skills and personality will enrich any team.',
      rating: 5.0,
    },
    {
      image: '/images/team/lyonel-berzen-github.png',
      name: 'Lyonel Berzen II',
      position: 'Frontend Developer',
      text: 'His tireless perseverance, especially in crisis situations, in which he remained calm, focused and solution-oriented, is remarkable. His ability to solve problems quickly and effectively was particularly impressive. He was also reliable at all times and always kept his word. Working on a project with Tayfun was a thoroughly positive experience.',
      rating: 4.0,
    },
    {
      image: '/images/team/fabion-latifi-github.jpg',
      name: 'Fabion Latifi II',
      position: 'Frontend Developer',
      text: 'Ty places great importance on effective communication, which fosters a collaborative and efficient working environment. Tayfun is disciplined and produces clean, reusable code that adheres to best practices. His design-oriented approach ensures that his solutions are both functional and aesthetically pleasing, enhancing the overall user experience. Tayfuns ability to work effectively and productively ensured that all projects were completed to the highest standard, making him an invaluable asset to any team.',
      rating: 4.5,
    },
  ];

  currentIndex = 0;
  showFullText: number | null = null; // Track the index of the expanded text
  isMobileView = false; // Responsive check for viewports

  constructor(
    private windowService: WindowService, 
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.checkViewport();
  }

  @HostListener('window:resize')
  checkViewport() {
    // this.isMobileView = window.innerWidth <= 480;
    if (isPlatformBrowser(this.platformId)) {
      this.isMobileView = this.windowService.isMobile();
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
  
}

