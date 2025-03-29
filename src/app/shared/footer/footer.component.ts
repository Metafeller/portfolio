import { Component, OnInit } from '@angular/core';
import { FooterConfig, FooterConfigService } from './footer.config.service';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component';
import { ScrollService } from '../../services/scroll.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnInit {
  config!: FooterConfig;
  logoHover: boolean = false;

  constructor(private footerConfigService: FooterConfigService, private scrollService: ScrollService) {}

  ngOnInit(): void {
    this.config = this.footerConfigService.getFooterConfig();
  }

  navigateTo(section: string) {
    this.scrollService.navigateToSection(section);  // ScrollService nutzen
  }

  // Funktion zum Öffnen externer Seiten
  redirectToExternalSite(url: string) {
    window.open(url, '_blank');
  }

}
