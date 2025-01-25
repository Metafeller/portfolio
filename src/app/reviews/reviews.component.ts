import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';



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

  reviews: Review[] = [
    {
      image: '/images/team/marc-braun-github.jpg',
      name: 'Marc Braun',
      position: 'Graphic Designer',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      rating: 5.0,
    },
    {
      image: '/images/team/lyonel-berzen-github.png',
      name: 'John Smith',
      position: 'Frontend Developer',
      text: 'John was an excellent colleague to work with.',
      rating: 5.0,
    },
    {
      image: '/images/team/fabion-latifi-github.jpg',
      name: 'Sarah Malik',
      position: 'Team Manager',
      text: 'She is highly skilled and brings great energy to the team.',
      rating: 4.5,
    },
    // Weitere Platzhalter-Reviews
    {
      image: '/images/team/fabion-latifi-github.jpg',
      name: 'Anna Fritz',
      position: 'Team Manager',
      text: 'She is highly skilled and brings great energy to the team.',
      rating: 4.0,
    },
    {
      image: '/images/team/fabion-latifi-github.jpg',
      name: 'Nina Blockhaus',
      position: 'Team Manager',
      text: 'She is highly skilled and brings great energy to the team.',
      rating: 4.0,
    },
  ];

  currentIndex = 0;

  get currentTransform(): string {
    return `translateX(calc(-100% * ${this.currentIndex}))`;
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

  getClassesForCard(index: number): string {
    if (index === this.currentIndex) {
      return 'review-card active';
    }
    return 'review-card inactive';
  }
  
}

