import { Component } from '@angular/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent {

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
