import { 
  AfterViewInit, 
  Component, 
  OnInit, 
  PLATFORM_ID, 
  Renderer2, 
  ElementRef, 
  Inject,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TechnologyPipe } from '../pipes/technology-pipe.pipe';
import { ButtonComponent } from '../shared/button/button.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';

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
  imports: [CommonModule, TechnologyPipe, ButtonComponent, TranslateModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements OnInit, AfterViewInit {

  projects: Project[] = [];
  selectedProject: Project | null = null; // Initialwert: null
  isOverlayOpen: boolean = false; // Steuerung der Sichtbarkeit des Overlays
  selectedProjectIndex: number = 0;

  @ViewChild('overlayContainer', { static: false }) overlayContainerRef!: ElementRef;

  constructor(
    private translate: TranslateService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private renderer: Renderer2,
    private elRef: ElementRef
  ) {}

  ngOnInit(): void {
    this.loadProjects();
    this.translate.onLangChange.subscribe(() => {
      this.loadProjects();
    });
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.observeElements(); // Beste Stelle für DOM-Animationen!
    }
  }

  observeElements(): void {
    const elements = this.elRef.nativeElement.querySelectorAll('.slide-in-left, .slide-in-right');
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.renderer.addClass(entry.target, 'in-view');
            observer.unobserve(entry.target); // Nur einmal auslösen
          }
        });
      },
      { threshold: 0.2 }
    );

    elements.forEach((el: HTMLElement) => observer.observe(el));
  }

  loadProjects(): void {
    this.projects = [

      {
        id: 1,
        name: this.translate.instant('projects.items.join.name'),
        description: this.translate.instant('projects.items.join.description'),
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
        name: this.translate.instant('projects.items.pollo.name'),
        description: this.translate.instant('projects.items.pollo.description'),
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
        name: this.translate.instant('projects.items.portfolio.name'),
        description: this.translate.instant('projects.items.portfolio.description'),
        technologies: [
          { name: 'Angular', icon: '/icons/overlay/angular.svg' },
          { name: 'HTML', icon: '/icons/overlay/html.svg' },
          { name: 'CSS', icon: '/icons/overlay/css.svg' },
          { name: 'TypeScript', icon: '/icons/overlay/typescript.svg' },
        ],
        githubUrl: 'https://github.com/Metafeller/portfolio',
        liveUrl: 'https://example.com/live-da-bubble',
        imageUrl: '/images/projects/frame-da-bubble.png',
      },

    ];
  }

    // {
    //   id: 1,
    //   name: 'Join CMS',
    //   description:
    //     'Task manager inspired by the Kanban System. Create and organize tasks using drag and drop functions, assign users and categories.',
    //   technologies: [
    //     { name: 'Firebase', icon: '/icons/overlay/firebase.svg' }, 
    //     { name: 'HTML', icon: '/icons/overlay/html.svg' },
    //     { name: 'CSS', icon: '/icons/overlay/css.svg' },
    //     { name: 'JavaScript', icon: '/icons/overlay/javascript.svg' },
    //   ],
    //   githubUrl: 'https://example.com/github-join',
    //   liveUrl: 'https://example.com/live-join',
    //   imageUrl: '/images/projects/frame-join-cms.png',
    // },
    // {
    //   id: 2,
    //   name: 'El Pollo Loco',
    //   description:
    //     'Jump, run, and throw game based on an object-oriented approach. Help Pepe find coins and tabasco salsa to fight against the crazy hen.',
    //     technologies: [
    //       { name: 'HTML', icon: '/icons/overlay/html.svg' },
    //       { name: 'CSS', icon: '/icons/overlay/css.svg' },
    //       { name: 'JavaScript', icon: '/icons/overlay/javascript.svg' },
    //     ],
    //   githubUrl: 'https://example.com/github-el-pollo-loco',
    //   liveUrl: 'https://example.com/live-el-pollo-loco',
    //   imageUrl: '/images/projects/frame-pollo-loco.png',
    // },
    // {
    //   id: 3,
    //   name: '15K Portfolio',
    //   description:
    //     'My 15K premium portfolio website to give you a serious introduction to my projects and a taste of my quality work. Every line of code is written by me.',
    //   technologies: [
    //     { name: 'Angular', icon: '/icons/overlay/angular.svg' }, 
    //     // { name: 'Firebase', icon: '/icons/overlay/firebase.svg' }, 
    //     { name: 'HTML', icon: '/icons/overlay/html.svg' },
    //     { name: 'CSS', icon: '/icons/overlay/css.svg' },
    //     { name: 'TypeScript', icon: '/icons/overlay/typescript.svg' },
    //   ],
    //   githubUrl: 'https://github.com/Metafeller/portfolio',
    //   liveUrl: 'https://example.com/live-da-bubble',
    //   imageUrl: '/images/projects/frame-da-bubble.png',
    // },
    
    // Der DA Bubble hier wird später freigeschaltet!
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


  openOverlay(project: Project, index: number): void {
    this.isOverlayOpen = true;
    this.selectedProjectIndex = index + 1; // Index plus 1, da Array bei 0 beginnt
    this.selectedProject = project;

    // Animierte Show-Klasse verzögert hinzufügen
    setTimeout(() => {
      if (this.overlayContainerRef) {
        this.renderer.addClass(this.overlayContainerRef.nativeElement, 'show');
      }
    }, 10);
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
    let nextIndex = (this.selectedProjectIndex % this.projects.length); // Modulo für Rundlauf
    let nextProject = this.projects[nextIndex];
    // Dann overlay neu öffnen
    this.selectedProject = nextProject;
    this.selectedProjectIndex = nextIndex + 1;
  }  

  // Hier wird die Weiterleitung zu einer Unterseite/Subdomain umgesetzt: Hier kommt meine Hauptwebseite mit savasboas.com/portfolio/projects
  openMoreProjects(): void {
    window.open('https://example.com/all-projects', '_blank'); // Link zu einer Beispiel-Seite
  }

}
