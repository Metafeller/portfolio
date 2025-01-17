import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TechnologyPipe } from '../pipes/technology-pipe.pipe';
import { ButtonComponent } from '../shared/button/button.component';

interface Technology {
  name: string; 
  icon: string; // Pfad zum Icon
}

interface Project {
  id: number;
  name: string;
  description: string;
  technologies: Technology[]; // Array von Technology
  githubUrl: string;
  liveUrl: string;
  imageUrl: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, TechnologyPipe, ButtonComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {
  projects: Project[] = [
    {
      id: 1,
      name: 'Join CMS',
      description:
        'Task manager inspired by the Kanban System. Create and organize tasks using drag and drop functions, assign users and categories.',
      technologies: [
        { name: 'Firebase', icon: '/icons/overlay/firebase.svg' }, 
        { name: 'HTML', icon: '/icons/overlay/html.svg' },
        { name: 'CSS', icon: '/icons/overlay/css.svg' },
        { name: 'JavaScript', icon: '/icons/overlay/javascript.svg' },
      ],
      githubUrl: 'https://example.com/github-join',
      liveUrl: 'https://example.com/live-join',
      imageUrl: '/images/projects/frame-join-cms.png',
    },
    {
      id: 2,
      name: 'El Pollo Loco',
      description:
        'Jump, run, and throw game based on an object-oriented approach. Help Pepe find coins and tabasco salsa to fight against the crazy hen.',
        technologies: [
          { name: 'HTML', icon: '/icons/overlay/html.svg' },
          { name: 'CSS', icon: '/icons/overlay/css.svg' },
          { name: 'JavaScript', icon: '/icons/overlay/javascript.svg' },
        ],
      githubUrl: 'https://example.com/github-el-pollo-loco',
      liveUrl: 'https://example.com/live-el-pollo-loco',
      imageUrl: '/images/projects/frame-pollo-loco.png',
    },
    {
      id: 3,
      name: '15K Portfolio',
      description:
        'My personal 15K premium portfolio website to give you a serious introduction to my projects and a taste of my quality work.',
      technologies: [
        { name: 'Angular', icon: '/icons/overlay/angular.svg' }, 
        { name: 'Firebase', icon: '/icons/overlay/firebase.svg' }, 
        { name: 'HTML', icon: '/icons/overlay/html.svg' },
        { name: 'CSS', icon: '/icons/overlay/css.svg' },
        { name: 'JavaScript', icon: '/icons/overlay/javascript.svg' },
      ],
      githubUrl: 'https://example.com/github-da-bubble',
      liveUrl: 'https://example.com/live-da-bubble',
      imageUrl: '/images/projects/frame-da-bubble.png',
    },
    // {
    //   id: 4,
    //   name: 'DA Bubble',
    //   description:
    //     'Slack clone app that revolutionizes team communication and collaboration with intuitive interfaces and real-time messaging.',
    //   technologies: ['Angular', 'TypeScript', 'HTML', 'CSS', 'Firebase'],
    //   githubUrl: 'https://example.com/github-da-bubble',
    //   liveUrl: 'https://example.com/live-da-bubble',
    //   imageUrl: '/images/projects/frame-da-bubble.png',
    // },
  ];

  selectedProject: Project | null = null; // Initialwert: null
  isOverlayOpen: boolean = false; // Steuerung der Sichtbarkeit des Overlays

  selectedProjectIndex: number = 0;

  openOverlay(project: Project, index: number): void {
    this.isOverlayOpen = true;
    this.selectedProjectIndex = index + 1; // Index plus 1, da Array bei 0 beginnt
    this.selectedProject = project;
  }

  closeOverlay(): void {
    this.isOverlayOpen = false;
    this.selectedProject = null;
  }

  openGithub(): void {
    if (this.selectedProject?.githubUrl) {
      window.open(this.selectedProject.githubUrl, '_blank');
    }
  }
  
  openLiveTest(): void {
    if (this.selectedProject?.liveUrl) {
      window.open(this.selectedProject.liveUrl, '_blank');
    }
  }
  
  goToNextProject(): void {
    // Logik fürs „nächste Projekt“
    // Beispiel: next ID, oder cyclich
    let nextIndex = (this.selectedProjectIndex % this.projects.length);
    let nextProject = this.projects[nextIndex];
    // Dann overlay neu öffnen
    this.selectedProject = nextProject;
    this.selectedProjectIndex = nextIndex + 1;
  }  

  constructor() {}

}
