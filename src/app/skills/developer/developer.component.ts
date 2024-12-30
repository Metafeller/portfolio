import { Component } from '@angular/core';
import { WindowService } from '../../window.service';
import { ButtonComponent } from '../../shared/button/button.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-developer',
  standalone: true,
  imports: [ButtonComponent, CommonModule],
  templateUrl: './developer.component.html',
  styleUrl: './developer.component.scss'
})
export class DeveloperComponent {
  skills = [
    { name: 'HTML', 
      icon: '/icons/skillset/html.svg', 
      isHovered: false, 
      isInfoboxVisible: false, 
      infoboxTitle: 'HTML',
      infoboxDescription: 'The backbone of the web. Structure your content effectively.',
      infoboxIcons: []
    },

    { name: 'CSS', 
      icon: '/icons/skillset/css.svg', 
      isHovered: false,
      isInfoboxVisible: false, 
      infoboxTitle: 'CSS',
      infoboxDescription: 'Design the web. Bring style and structure to your content.',
      infoboxIcons: []
    },

    { name: 'JavaScript', 
      icon: '/icons/skillset/javascript.svg', 
      isHovered: false,
      isInfoboxVisible: false, 
      infoboxTitle: 'JavaScript',
      infoboxDescription: 'Bring your website to life with interactivity and logic.',
      infoboxIcons: []
    },

    { name: 'Material Design', 
      icon: '/icons/skillset/material-design.svg', 
      isHovered: false, 
      isInfoboxVisible: false, 
      infoboxTitle: 'Material Design',
      infoboxDescription: 'Create beautiful and consistent user interfaces inspired by Google.',
      infoboxIcons: []
    },

    { name: 'TypeScript', 
      icon: '/icons/skillset/typescript.svg', 
      isHovered: false,
      isInfoboxVisible: false, 
      infoboxTitle: 'TypeScript',
      infoboxDescription: 'Enhance JavaScript with type safety and cleaner code.',
      infoboxIcons: []
    },

    { name: 'Angular', 
      icon: '/icons/skillset/angular.svg', 
      isHovered: false,
      isInfoboxVisible: false, 
      infoboxTitle: 'Angular',
      infoboxDescription: 'Build dynamic web applications with a powerful framework.',
      infoboxIcons: []
    },

    { name: 'Firebase', 
      icon: '/icons/skillset/firebase.svg', 
      isHovered: false,
      isInfoboxVisible: false, 
      infoboxTitle: 'Firebase',
      infoboxDescription: 'Simplify backend operations with real-time database and hosting.',
      infoboxIcons: []
    },

    { name: 'Bootstrap', 
      icon: '/icons/skillset/bootstrap-100.svg',
      isHovered: false,
      isInfoboxVisible: false, 
      infoboxTitle: 'Bootstrap',
      infoboxDescription: 'Quickly design responsive websites with prebuilt components and grid systems.',
      infoboxIcons: []
    },

    { name: 'GIT', 
      icon: '/icons/skillset/git.svg', 
      isHovered: false,
      isInfoboxVisible: false, 
      infoboxTitle: 'GIT',
      infoboxDescription: 'Track, manage, and collaborate on code changes effectively.',
      infoboxIcons: []
    },

    { name: 'Rest-API', 
      icon: '/icons/skillset/rest-api.svg', 
      isHovered: false, 
      isInfoboxVisible: false, 
      infoboxTitle: 'Rest-API',
      infoboxDescription: 'Connect and communicate seamlessly with web services.',
      infoboxIcons: []
    },

    { name: 'Scrum', 
      icon: '/icons/skillset/scrum.svg', 
      isHovered: false,
      isInfoboxVisible: false, 
      infoboxTitle: 'Scrum',
      infoboxDescription: 'Work agile. Deliver projects efficiently with team collaboration.',
      infoboxIcons: []
    },

    { 
      name: 'Growth Mindset', 
      icon: '/icons/skillset/growth-mindset.svg', 
      isHovered: false, 
      isInfoboxVisible: false, 
      infoboxTitle: 'Growth Mindset',
      infoboxDescription: 'I have a special interest in learning.',
      infoboxIcons: [
        { src: '/icons/skillset/react-color.svg', alt: 'React' },
        // { src: '/icons/skillset/vue-js-2-color.svg', alt: 'Vue.js' },
        { src: '/icons/skillset/python-custom-100.svg', alt: 'Python' },
        { src: '/icons/skillset/dj-django-100.svg', alt: 'Django' },
      ],
    },
  ];

  constructor(private windowService: WindowService) {}

  toggleInfobox(skill: any): void {
    if (this.windowService.isMobile() || this.windowService.isTablet()) {
      // Klickbare Infobox nur auf mobilen und Tablet-Geräten
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
      // Hover nur auf Desktop-Geräten
      skill.isHovered = true;
    }
  }

  hideHover(skill: any): void {
    if (this.windowService.isDesktop()) {
      // Hover verlassen nur auf Desktop-Geräten
      skill.isHovered = false;
    }
  }
}

