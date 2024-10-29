import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  menuOpen = false;

  onMouseOver() {
    const logo = document.getElementById('header-logo') as HTMLImageElement;
    if (logo) {
      logo.src = './../logos/beispiel-logo-hover.png';
    }
  }

  onMouseLeave() {
    const logo = document.getElementById('header-logo') as HTMLImageElement;
    if (logo) {
      logo.src = './../logos/beispiel-logo-default.png';
    }
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

}
