import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface Project {
  id: number;
  name: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
  imageUrl: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {
  projects: Project[] = [
    {
      id: 1,
      name: 'Join',
      description:
        'Task manager inspired by the Kanban System. Create and organize tasks using drag and drop functions, assign users and categories.',
      technologies: ['HTML', 'CSS', 'JavaScript', 'Firebase'],
      githubUrl: 'https://example.com/github-join',
      liveUrl: 'https://example.com/live-join',
      imageUrl: '/images/projects/ai-lex.png',
    },
    {
      id: 2,
      name: 'El Pollo Loco',
      description:
        'Jump, run, and throw game based on an object-oriented approach. Help Pepe find coins and tabasco salsa to fight against the crazy hen.',
      technologies: ['HTML', 'CSS', 'JavaScript'],
      githubUrl: 'https://example.com/github-el-pollo-loco',
      liveUrl: 'https://example.com/live-el-pollo-loco',
      imageUrl: '/images/projects/ai-lex.png',
    },
    {
      id: 3,
      name: 'DA Bubble',
      description:
        'Slack clone app that revolutionizes team communication and collaboration with intuitive interfaces and real-time messaging.',
      technologies: ['Angular', 'TypeScript', 'HTML', 'CSS', 'Firebase'],
      githubUrl: 'https://example.com/github-da-bubble',
      liveUrl: 'https://example.com/live-da-bubble',
      imageUrl: '/images/projects/ai-lex.png',
    },
  ];

  selectedProject: Project | null = null; // Initialwert: null

  constructor() {}

}
