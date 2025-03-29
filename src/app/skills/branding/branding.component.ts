import { Component } from '@angular/core';
import { WindowService } from '../../window.service';
import { ButtonComponent } from '../../shared/button/button.component';
import { CommonModule } from '@angular/common';
import { ScrollService } from '../../services/scroll.service';
// import { ServerTestingModule } from '@angular/platform-server/testing';

interface InfoboxIcon {
  src: string;
  alt: string;
}

@Component({
  selector: 'app-branding',
  standalone: true,
  imports: [ButtonComponent, CommonModule],
  templateUrl: './branding.component.html',
  styleUrl: './branding.component.scss'
})
export class BrandingComponent {
  skills = [
    {
      name: 'Brand Awareness',
      icon: '/icons/branding/brand-awareness-flowchart.png',
      isHovered: false,
      isInfoboxVisible: false,
      infoboxTitle: 'Brand Awareness',
      infoboxDescription: 'Establish a strong presence to resonate with your target audience.',
      infoboxIcons: [] as InfoboxIcon[]
    },

    {
      name: 'Brand Strategy',
      icon: '/icons/branding/brand-strategies.png',
      isHovered: false,
      isInfoboxVisible: false,
      infoboxTitle: 'Brand Strategies',
      infoboxDescription: 'Craft smart, emotional strategies to create an authentic brand.',
      infoboxIcons: [] as InfoboxIcon[]
    },

    {
      name: 'Personal Brand',
      icon: '/icons/branding/personal-branding.png',
      isHovered: false,
      isInfoboxVisible: false,
      infoboxTitle: 'Personal Branding',
      infoboxDescription: 'Build an authentic and inspiring personal brand.',
      infoboxIcons: [] as InfoboxIcon[]
    },

    {
      name: 'Target Group',
      icon: '/icons/branding/target-audience.png',
      isHovered: false,
      isInfoboxVisible: false,
      infoboxTitle: 'Target Group Definition',
      infoboxDescription: 'Identify and understand your ideal audience to tailor your communication.',
      infoboxIcons: [] as InfoboxIcon[]
    },

    {
      name: 'Market Positioning',
      icon: '/icons/branding/market-positioning.png',
      isHovered: false,
      isInfoboxVisible: false,
      infoboxTitle: 'Market Positioning',
      infoboxDescription: 'Stand out by positioning your brand uniquely in the market.',
      infoboxIcons: [] as InfoboxIcon[]
    },

    {
      name: 'Unique Selling Point',
      icon: '/icons/branding/unique-selling-point.png',
      isHovered: false,
      isInfoboxVisible: false,
      infoboxTitle: 'Unique Selling Point (USP)',
      infoboxDescription: 'Define what makes your brand special and differentiate it from competitors.',
      infoboxIcons: [] as InfoboxIcon[]
    },

    {
      name: 'Graphic Design',
      icon: '/icons/branding/graphic-design.png',
      isHovered: false,
      isInfoboxVisible: false,
      infoboxTitle: 'Graphic Design',
      infoboxDescription: 'Communicate visually with high-quality designs and creative assets.',
      infoboxIcons: [] as InfoboxIcon[]
    },

    {
      name: 'Web Design',
      icon: '/icons/branding/ux-ui-web-design.png',
      isHovered: false,
      isInfoboxVisible: false,
      infoboxTitle: 'Web Design & UX / UI',
      infoboxDescription: 'Create seamless and visually appealing digital experiences.',
      infoboxIcons: [] as InfoboxIcon[]
    },

    {
      name: 'Public Relations',
      icon: '/icons/branding/pr-public-relations.png',
      isHovered: false,
      isInfoboxVisible: false,
      infoboxTitle: 'Public Relations [ PR ]',
      infoboxDescription: 'Build trust and manage your brand\'s reputation effectively',
      infoboxIcons: [] as InfoboxIcon[]
    },

    {
      name: 'Visability Strategies',
      icon: '/icons/branding/visability-strategies.png',
      isHovered: false,
      isInfoboxVisible: false,
      infoboxTitle: 'Dynamic Visability',
      infoboxDescription: 'Be visible and relevant across all key channels with adaptive strategies.',
      infoboxIcons: [] as InfoboxIcon[]
    },

    {
      name: 'AI-Agency',
      icon: '/icons/branding/bot.png',
      isHovered: false,
      isInfoboxVisible: false,
      infoboxTitle: 'AI-Agency',
      infoboxDescription: 'Use AI to automate your business or create digital influencers to increase your brand\'s reach.',
      infoboxIcons: [] as InfoboxIcon[]
    },

    {
      name: 'Growth Mindset',
      icon: '/icons/branding/growth-mindset-rare-green.png',
      isHovered: false,
      isInfoboxVisible: false,
      infoboxTitle: 'Growth Mindset',
      infoboxDescription: 'I am interested in innovative and rare niches such as Blockchain. AI-Agency and Web 3.0',
      infoboxIcons: [
        { src: '/icons/branding/artificial-intelligence-ai.png', alt: 'Artificial Intelligence' },
        // { src: '/icons/skillset/vue-js-2-color.svg', alt: 'Vue.js' },
        { src: '/icons/branding/blockchain-technologie.png', alt: 'Blockchain' },
        { src: '/icons/branding/metaverse.png', alt: 'Metaverse NFTs' },
        // { src: '/icons/branding/web-30.png', alt: 'Web 3.0' },
      ] as InfoboxIcon[]
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
