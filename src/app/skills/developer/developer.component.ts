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
    { name: 'CSS', icon: '/icons/skillset/css.svg', isHovered: false },
    { name: 'JavaScript', icon: '/icons/skillset/javascript.svg', isHovered: false },
    { name: 'Material Design', icon: '/icons/skillset/material-design.svg', isHovered: false },
    { name: 'TypeScript', icon: '/icons/skillset/typescript.svg', isHovered: false },
    { name: 'Angular', icon: '/icons/skillset/angular.svg', isHovered: false },
    { name: 'Firebase', icon: '/icons/skillset/firebase.svg', isHovered: false },
    { name: 'GIT', icon: '/icons/skillset/git.svg', isHovered: false },
    { name: 'Rest-API', icon: '/icons/skillset/rest-api.svg', isHovered: false },
    { name: 'Scrum', icon: '/icons/skillset/scrum.svg', isHovered: false },
    { 
      name: 'Growth Mindset', 
      icon: '/icons/skillset/growth-mindset.svg', 
      isHovered: false, 
      isInfoboxVisible: false, 
      infoboxTitle: 'Growth Mindset',
      infoboxDescription: 'I have a special interest in learning.',
      infoboxIcons: [
        { src: '/icons/skillset/react-color.svg', alt: 'React' },
        { src: '/icons/skillset/vue-js-2-color.svg', alt: 'Vue.js' },
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

