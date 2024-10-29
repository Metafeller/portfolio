import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HostListener } from '@angular/core';

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
