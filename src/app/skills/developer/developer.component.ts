import { Component } from '@angular/core';
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
    { name: 'HTML', icon: '/icons/skillset/html.svg', isHovered: false },
    { name: 'CSS', icon: '/icons/skillset/css.svg', isHovered: false },
    { name: 'JavaScript', icon: '/icons/skillset/javascript.svg', isHovered: false },
    { name: 'Material Design', icon: '/icons/skillset/material-design.svg', isHovered: false },
    { name: 'TypeScript', icon: '/icons/skillset/typescript.svg', isHovered: false },
    { name: 'Angular', icon: '/icons/skillset/angular.svg', isHovered: false },
    { name: 'Firebase', icon: '/icons/skillset/firebase.svg', isHovered: false },
    { name: 'GIT', icon: '/icons/skillset/git.svg', isHovered: false },
    { name: 'Rest-API', icon: '/icons/skillset/rest-api.svg', isHovered: false },
    { name: 'Scrum', icon: '/icons/skillset/scrum.svg', isHovered: false },
    { name: 'Growth Mindset', icon: '/icons/skillset/growth-mindset.svg', isHovered: false },
  ];

  showHover(skill: any): void {
    skill.isHovered = true;
  }

  hideHover(skill: any): void {
    skill.isHovered = false;
  }
}

