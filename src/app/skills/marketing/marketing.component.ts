import { Component } from '@angular/core';
import { WindowService } from '../../window.service';
import { ButtonComponent } from '../../shared/button/button.component';
import { CommonModule } from '@angular/common';

interface InfoboxIcon {
  src: string;
  alt: string;
}

@Component({
  selector: 'app-marketing',
  standalone: true,
  imports: [ButtonComponent, CommonModule],
  templateUrl: './marketing.component.html',
  styleUrl: './marketing.component.scss'
})
export class MarketingComponent {
  skills = [
    {
      name: 'SEO Optimization',
      icon: '/icons/marketing/seo.png',
      isHovered: false,
      isInfoboxVisible: false,
      infoboxTitle: 'SEO Optimization',
      infoboxDescription: 'Enhance your website’s visibility and ranking in search engines.',
      infoboxIcons: [] as InfoboxIcon[]
    },
    {
      name: 'Social Media Campaigns',
      icon: '/icons/marketing/social-media.png',
      isHovered: false,
      isInfoboxVisible: false,
      infoboxTitle: 'Social Media Campaigns',
      infoboxDescription: 'Create engaging campaigns to connect with your audience.',
      infoboxIcons: [] as InfoboxIcon[]
    },
    // Weitere Skills hinzufügen
  ];

  constructor(private windowService: WindowService) {}

  toggleInfobox(skill: any): void {
    if (this.windowService.isMobile() || this.windowService.isTablet()) {
      this.skills.forEach(s => {
        if (s !== skill) {
          s.isInfoboxVisible = false;
        }
      });
      skill.isInfoboxVisible = !skill.isInfoboxVisible;
    }
  }

  showHover(skill: any): void {
    if (this.windowService.isDesktop()) {
      skill.isHovered = true;
    }
  }

  hideHover(skill: any): void {
    if (this.windowService.isDesktop()) {
      skill.isHovered = false;
    }
  }
}

