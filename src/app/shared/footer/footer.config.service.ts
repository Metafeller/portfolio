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
        '/svg-icons/seal/taironman-seal-4.svg',
        '/svg-icons/seal/google-reviews_49.png',
        '/svg-icons/seal/software-quality.png'
      ],
      fundraising: {
        h2: 'Fundraising Campaign',
        h3: 'Join the Movement',
        p: 'Support our cause and help us make a difference.',
        span: 'Your contribution matters.',
        image: '/images/fundrasing-child.png',
        buttonText: 'Donate Now',
        buttonLink: 'https://savasboas.com/fundraising'  // Externe URL
      }
    },
    
    middle: {
      superheroSkills: [
        { text: 'Web Developer', link: 'skills' },
        { text: 'Web Design (UI/UX)', link: 'skills' },
        { text: 'Branding- and Marketingmanager', link: 'skills' },
        { text: 'Inbound-Marketing-Manager', link: 'skills' },
        { text: 'AI-Solutions', link: 'skills' }
      ],
      creativeLocations: [
        { icon: '/svg-icons/nation/deutschland.png', text: 'Germany', link: 'https://savasboas.com/blog/locations' },
        { icon: '/svg-icons/nation/schweiz.png', text: 'Switzerland', link: 'https://savasboas.com/blog/locations' },
        { icon: '/svg-icons/nation/spanien.png', text: 'Tenerife', link: 'https://savasboas.com/blog/locations' },
        // { icon: '/svg-icons/nation/gran-canaria-islands.png', text: 'Gran Canaria', link: 'https://savasboas.com/blog/locations' },
        // { icon: '/svg-icons/nation/vereinigte-arabische-emirate.png', text: 'Dubai (VAE)', link: '#' },
        { icon: '/svg-icons/nation/northern-cyprus.png', text: 'Northern Cyprus', link: 'https://savasboas.com/blog/locations' },
        { icon: '/svg-icons/media/icons8-avengers-100.svg', text: 'Razor-Point', link: 'https://savasboas.com/blog/locations' }
      ],
      followMeOn: [
        { icon: '/svg-icons/social/github.svg', text: 'GitHub', link: 'https://github.com/Metafeller' },
        { icon: '/svg-icons/social/linkedin.svg', text: 'LinkedIn', link: 'https://www.linkedin.com/' },
        { icon: '/svg-icons/social/instagram.svg', text: 'Instagram', link: 'https://www.instagram.com/' },
        { icon: '/svg-icons/social/twitterx.svg', text: 'Twitter X', link: 'https://www.twitter.com/' },
        { icon: '/svg-icons/media/discord.png', text: 'Discord', link: 'https://discord.com/' },
        { icon: '/svg-icons/media/tiktok.png', text: 'TikTok', link: 'https://www.tiktok.com/' },
        { icon: '/svg-icons/media/youtube.png', text: 'YouTube', link: 'https://www.youtube.com/' }
      ],
      contactMe: {
        emailIcon: '/svg-icons/social/mail.svg',
        emailAddress: ' mail@metafeller.com',
        contactRequestIcon: '/svg-icons/art/feather-3.png', // Neue Icon-Property
        contactRequestText: 'Contact Request',
        buttonText: "Let's Talk ↗",
        buttonLink: 'contact'
      }
    },
    bottom: {
      copyrightIcon: '/svg-icons/copyright/copyright-accent-color.png',
      copyrightText: '2025 AYA, Inc. All rights reserved',
      madeBy: 'Made By Taironman with',
      legalNoticeText: 'Legal Notice',
      legalNoticeLink: '/legal/legal',
      privacyPolicyText: 'Privacy Policy',
      privacyPolicyLink: '/privacy/privacy'
    }
  };

  getFooterConfig(): FooterConfig {
    return this.config;
  }
}
