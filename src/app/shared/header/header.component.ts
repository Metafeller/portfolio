import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WindowService } from '../../window.service';
import { ScrollService } from '../../services/scroll.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  menuOpen = false;
  screenWidth: number = 0;

  constructor(private windowService: WindowService, private scrollService: ScrollService) {}

  ngOnInit() {
    const windowRef = this.windowService.nativeWindow;
    if (windowRef) {
      this.screenWidth = windowRef.innerWidth;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    const windowRef = this.windowService.nativeWindow;
    if (windowRef) {
      this.screenWidth = event.target.innerWidth;
    }
  }

  onMouseOver() {
    const logo = document.getElementById('header-logo') as HTMLImageElement;
    if (logo) {
      logo.src = './../logos/aya/9.svg';
    }
  }

  onMouseLeave() {
    const logo = document.getElementById('header-logo') as HTMLImageElement;
    if (logo) {
      logo.src = './../logos/aya/11.svg';
    }
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  navigateTo(section: string) {
    this.scrollService.navigateToSection(section);  // Nutze den neuen ScrollService zum Navigieren
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
