import { Injectable } from '@angular/core';

export interface FooterConfig {
  top: {
    logoDefault: string;
    logoHover: string;
    personalMessage: string;
    sealIcons: Array<string>;
    fundraising: {
      h2: string;
      h3: string;
      p: string;
      span: string;
      image: string;
      buttonText: string;
      buttonLink: string;
    }
  };
  middle: {
    superheroSkills: Array<{ text: string, link: string }>;
    creativeLocations: Array<{ icon: string, text: string, link: string }>;
    followMeOn: Array<{ icon: string, text: string, link: string }>;
    contactMe: {
      emailIcon: string;
      emailAddress: string;
      contactRequestText: string;
      buttonText: string;
      buttonLink: string;
    }
  };
  bottom: {
    copyrightIcon: string;
    copyrightText: string;
    madeBy: string;
    legalNoticeText: string;
    legalNoticeLink: string;
    privacyPolicyText: string;
    privacyPolicyLink: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class FooterConfigService {
  private config: FooterConfig = {
    top: {
      logoDefault: '/logos/logo-default.png',
      logoHover: '/logos/logo-hover.png',
      personalMessage: 'Your personal message here with love',
      sealIcons: [
        '/placeholder/seal1.png',
        '/placeholder/seal2.png',
        '/placeholder/seal3.png'
      ],
      fundraising: {
        h2: 'Fundraising Campaign',
        h3: 'Join the Movement',
        p: 'Support our cause and help us make a difference.',
        span: 'Your contribution matters.',
        image: '/placeholder/fundraising.png',
        buttonText: 'Donate Now',
        buttonLink: '/donate'
      }
    },
    middle: {
      superheroSkills: [
        { text: 'Web Developer', link: '#' },
        { text: 'Web Design (UI/UX)', link: '#' },
        { text: 'Branding- and Marketingmanager', link: '#' },
        { text: 'Inbound-Marketing-Manager', link: '#' },
        { text: 'AI-Solutions', link: '#' }
      ],
      creativeLocations: [
        { icon: '/placeholder/germany.png', text: 'NRW - Germany', link: '#' },
        { icon: '/placeholder/switzerland.png', text: 'Switzerland', link: '#' },
        { icon: '/placeholder/spain.png', text: 'Tenerife', link: '#' },
        { icon: '/placeholder/your-logo.png', text: 'Razor-Point', link: '#' },
        { icon: '/placeholder/cyprus.png', text: 'Cyprus Blue Zone', link: '#' },
        { icon: '/placeholder/dubai.png', text: 'Dubai', link: '#' }
      ],
      followMeOn: [
        { icon: '/placeholder/github.png', text: 'GitHub', link: '#' },
        { icon: '/placeholder/linkedin.png', text: 'LinkedIn', link: '#' },
        { icon: '/placeholder/instagram.png', text: 'Instagram', link: '#' },
        { icon: '/placeholder/twitter.png', text: 'Twitter (X)', link: '#' },
        { icon: '/placeholder/discord.png', text: 'Discord', link: '#' },
        { icon: '/placeholder/tiktok.png', text: 'TikTok', link: '#' }
      ],
      contactMe: {
        emailIcon: '/placeholder/email.png',
        emailAddress: 'contact@taironman.com',
        contactRequestText: 'Contact Request',
        buttonText: "Let's Talk",
        buttonLink: '/contact'
      }
    },
    bottom: {
      copyrightIcon: '/placeholder/copyright.png',
      copyrightText: '2023 AYA, Inc. All rights reserved',
      madeBy: 'Made By Taironman with',
      legalNoticeText: 'Legal Notice',
      legalNoticeLink: '/legal',
      privacyPolicyText: 'Privacy Policy',
      privacyPolicyLink: '/privacy'
    }
  };

  getFooterConfig(): FooterConfig {
    return this.config;
  }
}
