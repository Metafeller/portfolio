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
      contactRequestIcon: string;
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
      logoDefault: '/logos/aya/10.svg',
      logoHover: '/logos/aya/9.svg',
      personalMessage: 'This is art at the highest level. Every line of code was written by me. This website was developed with HTML, SCSS, CSS, JS, TS and Angular',
      sealIcons: [
        '/icons/seal/taironman-seal-4.svg',
        '/icons/seal/google-reviews_49.png',
        '/icons/seal/software-quality.png'
      ],
      fundraising: {
        h2: 'Fundraising Campaign',
        h3: 'Join the Movement',
        p: 'Support our cause and help us make a difference.',
        span: 'Your contribution matters.',
        image: '/images/fundrasing-child.png',
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
        { icon: '/icons/nation/deutschland.png', text: 'Germany', link: '#' },
        { icon: '/icons/nation/schweiz.png', text: 'Switzerland', link: '#' },
        { icon: '/icons/nation/spanien.png', text: 'Tenerife', link: '#' },
        { icon: '/icons/nation/gran-canaria-islands.png', text: 'Gran Canaria', link: '#' },
        { icon: '/icons/nation/vereinigte-arabische-emirate.png', text: 'Dubai (VAE)', link: '#' },
        // { icon: '/icons/nation/cyprus.png', text: 'Cyprus', link: '#' },
        { icon: '/icons/media/icons8-avengers-100.svg', text: 'Razor-Point', link: '#' }
      ],
      followMeOn: [
        { icon: '/icons/social/github.svg', text: 'GitHub', link: '#' },
        { icon: '/icons/social/linkedin.svg', text: 'LinkedIn', link: '#' },
        { icon: '/icons/social/instagram.svg', text: 'Instagram', link: '#' },
        { icon: '/icons/social/twitterx.svg', text: 'Twitter (X)', link: '#' },
        { icon: '/icons/media/discord.png', text: 'Discord', link: '#' },
        { icon: '/icons/media/tiktok.png', text: 'TikTok', link: '#' },
        { icon: '/icons/media/youtube.png', text: 'YouTube', link: '#' }
      ],
      contactMe: {
        emailIcon: '/icons/social/mail.svg',
        emailAddress: ' contact@taironman.com',
        contactRequestIcon: '/icons/art/feather-3.png', // Neue Icon-Property
        contactRequestText: 'Contact Request',
        buttonText: "Let's Talk ↗",
        buttonLink: '/contact'
      }
    },
    bottom: {
      copyrightIcon: '/icons/copyright/copyright-accent-color.png',
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
