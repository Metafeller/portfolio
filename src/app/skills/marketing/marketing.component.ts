import { Component } from '@angular/core';
import { WindowService } from '../../window.service';
import { ButtonComponent } from '../../shared/button/button.component';
import { CommonModule } from '@angular/common';
import { ScrollService } from '../../services/scroll.service';
import { TranslateModule } from '@ngx-translate/core';

interface InfoboxIcon {
  src: string;
  alt: string;
}

@Component({
  selector: 'app-marketing',
  standalone: true,
  imports: [ButtonComponent, CommonModule, TranslateModule],
  templateUrl: './marketing.component.html',
  styleUrl: './marketing.component.scss',
})
export class MarketingComponent {
  skills = [
    // Gruppe 1: Strategien und Kanäle
    {
      name: 'Touchpoints Selection',
      icon: '/icons/marketing/channels.png',
      isHovered: false,
      isInfoboxVisible: false,
      infoboxTitle: 'Touchpoints Selection',
      infoboxDescription: 'Choose the right channels to reach your audience at the perfect time.',
      infoboxIcons: [] as InfoboxIcon[],
    },
    {
      name: 'Organic Online Campaigns',
      icon: '/icons/marketing/organic-sprout.png',
      isHovered: false,
      isInfoboxVisible: false,
      infoboxTitle: 'Organic Online Campaigns',
      infoboxDescription: 'Engage authentically with creative, budget-free marketing.',
      infoboxIcons: [] as InfoboxIcon[],
    },
    {
      name: 'Paid Marketing Campaigns',
      icon: '/icons/marketing/meta.png',
      isHovered: false,
      isInfoboxVisible: false,
      infoboxTitle: 'Paid Marketing',
      infoboxDescription: 'Maximize reach with efficient paid strategies across digital platforms.',
      infoboxIcons: [] as InfoboxIcon[],
    },
    {
      name: 'Social Media Marketing',
      icon: '/icons/marketing/social-media-advertising.png',
      isHovered: false,
      isInfoboxVisible: false,
      infoboxTitle: 'Social Media Marketing',
      infoboxDescription: 'Connect with your audience directly on platforms they love.',
      infoboxIcons: [] as InfoboxIcon[],
    },

    // Gruppe 2: Technische Optimierung und Automatisierung
    {
      name: 'SEO Optimization',
      icon: '/icons/marketing/seo.png',
      isHovered: false,
      isInfoboxVisible: false,
      infoboxTitle: 'SEO Optimization',
      infoboxDescription: 'Boost your visibility by optimizing for search engines.',
      infoboxIcons: [] as InfoboxIcon[],
    },
    {
      name: 'Google Ads & AdSense',
      icon: '/icons/marketing/google-ads.png',
      isHovered: false,
      isInfoboxVisible: false,
      infoboxTitle: 'Google Ads & AdSense',
      infoboxDescription: "Leverage Google's ad tools for effective marketing and monetization.",
      infoboxIcons: [] as InfoboxIcon[],
    },
    {
      name: 'Automated Funnel Concepts',
      icon: '/icons/marketing/sales-funnel.png',
      isHovered: false,
      isInfoboxVisible: false,
      infoboxTitle: 'Funnel Concepts',
      infoboxDescription: 'Streamline your processes with automated sales and lead funnels.',
      infoboxIcons: [] as InfoboxIcon[],
    },

    // Gruppe 3: Lead-Generierung und Kundenbindung
    {
      name: 'Automated Lead Generation',
      icon: '/icons/marketing/lead-generation.png',
      isHovered: false,
      isInfoboxVisible: false,
      infoboxTitle: 'Lead Generation',
      infoboxDescription: 'Convert visitors into loyal customers with targeted landing pages.',
      infoboxIcons: [] as InfoboxIcon[],
    },
    {
      name: 'Account Management',
      icon: '/icons/marketing/account-management-network.png',
      isHovered: false,
      isInfoboxVisible: false,
      infoboxTitle: 'Account Management [CRM]',
      infoboxDescription: 'Foster long-term customer relationships with personalized strategies.',
      infoboxIcons: [] as InfoboxIcon[],
    },

    // Gruppe 4: Content und Partnerstrategien
    {
      name: 'Content Marketing',
      icon: '/icons/marketing/digital-content.png',
      isHovered: false,
      isInfoboxVisible: false,
      infoboxTitle: 'Content Marketing',
      infoboxDescription: 'Inspire and inform with high-quality, engaging content.',
      infoboxIcons: [] as InfoboxIcon[],
    },
    {
      name: 'Affiliate Marketing',
      icon: '/icons/marketing/up-arrow.png',
      isHovered: false,
      isInfoboxVisible: false,
      infoboxTitle: 'Influencer & Affiliate Marketing',
      infoboxDescription: 'Partner with influencers and affiliates to expand your reach.',
      infoboxIcons: [] as InfoboxIcon[],
    },

    // Gruppe 5: Wachstum und Skalierung
    {
      name: 'Exponential Growth Strategies',
      icon: '/icons/marketing/growth-strategies-pestle.png',
      isHovered: false,
      isInfoboxVisible: false,
      infoboxTitle: 'Exponential Growth Strategies',
      infoboxDescription: 'Achieve sustainable and impactful scaling with innovative methods.',
      infoboxIcons: [] as InfoboxIcon[],
    },
  ];

  constructor(private windowService: WindowService, private scrollService: ScrollService) {}

  navigateTo(section: string) {
    this.scrollService.navigateToSection(section);
  }

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
