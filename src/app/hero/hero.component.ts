import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ScrollService } from '../services/scroll.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent {

  constructor(private scrollService: ScrollService) {}

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
