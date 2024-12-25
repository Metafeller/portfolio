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
    { name: 'HTML', icon: 'assets/icons/html.svg', isHovered: false },
    { name: 'CSS', icon: 'assets/icons/css.svg', isHovered: false },
    { name: 'JavaScript', icon: 'assets/icons/javascript.svg', isHovered: false },
    { name: 'Material Design', icon: 'assets/icons/material-design.svg', isHovered: false },
    { name: 'TypeScript', icon: 'assets/icons/typescript.svg', isHovered: false },
    { name: 'Angular', icon: 'assets/icons/angular.svg', isHovered: false },
    { name: 'Firebase', icon: 'assets/icons/firebase.svg', isHovered: false },
    { name: 'GIT', icon: 'assets/icons/git.svg', isHovered: false },
    { name: 'Rest-API', icon: 'assets/icons/rest-api.svg', isHovered: false },
    { name: 'Scrum', icon: 'assets/icons/scrum.svg', isHovered: false },
    { name: 'Growth Mindset', icon: 'assets/icons/growth-mindset.svg', isHovered: false },
  ];

  showHover(skill: any): void {
    skill.isHovered = true;
  }

  hideHover(skill: any): void {
    skill.isHovered = false;
  }
}

