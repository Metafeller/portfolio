import { 
  AfterViewInit, 
  Component, 
  ElementRef, 
  Renderer2, 
  OnDestroy, 
  OnInit, 
  Inject, 
  PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { WindowService } from '../../window.service';
import { ButtonComponent } from '../../shared/button/button.component';
import { CommonModule } from '@angular/common';
import { ScrollService } from '../../services/scroll.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-developer',
  standalone: true,
  imports: [ButtonComponent, CommonModule, TranslateModule],
  templateUrl: './developer.component.html',
  styleUrl: './developer.component.scss'
})
export class DeveloperComponent implements OnInit, OnDestroy, AfterViewInit {
  skills: any[] = [];
  private langChangeSub!: Subscription;

  constructor(
    private windowService: WindowService, 
    private scrollService: ScrollService,
    private translate: TranslateService,
    private renderer: Renderer2,
    private elRef: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.loadSkills();

    // Sprache wechseln → Skills neu laden
    this.langChangeSub = this.translate.onLangChange.subscribe(() => {
      this.loadSkills();
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
  

  ngOnDestroy(): void {
    if (this.langChangeSub) {
      this.langChangeSub.unsubscribe();
    }
  }

  loadSkills(): void {

    this.skills = [
      this.createSkill('HTML', '/icons/skillset/html.svg'),
      this.createSkill('CSS', '/icons/skillset/css.svg'),
      this.createSkill('JavaScript', '/icons/skillset/javascript.svg'),
      this.createSkill('Material Design', '/icons/skillset/material-design.svg'),
      this.createSkill('TypeScript', '/icons/skillset/typescript.svg'),
      this.createSkill('angular', '/icons/skillset/angular.svg'),
      this.createSkill('firebase', '/icons/skillset/firebase.svg'),
      this.createSkill('bootstrap', '/icons/skillset/bootstrap-100.svg'),
      this.createSkill('GIT', '/icons/skillset/git.svg'),
      this.createSkill('REST-API', '/icons/skillset/rest-api.svg'),
      this.createSkill('scrum', '/icons/skillset/scrum.svg'),
      {
        name: 'Growth Mindset',
        icon: '/icons/skillset/growth-mindset.svg',
        isHovered: false,
        isInfoboxVisible: false,
        infoboxTitle: this.translate.instant('skills.developer.skills.growth.title'),
        infoboxDescription: this.translate.instant('skills.developer.skills.growth.description'),
        infoboxIcons: [
          { src: '/icons/skillset/react-color.svg', alt: 'React' },
          { src: '/icons/skillset/python-custom-100.svg', alt: 'Python' },
          { src: '/icons/skillset/dj-django-100.svg', alt: 'Django' }
        ]
      }
    ];
  }

  createSkill(key: string, iconPath: string): any {
    return {
      name: key.charAt(0).toUpperCase() + key.slice(1),
      icon: iconPath,
      isHovered: false,
      isInfoboxVisible: false,
      infoboxTitle: this.translate.instant(`skills.developer.skills.${key}.title`),
      infoboxDescription: this.translate.instant(`skills.developer.skills.${key}.description`),
      infoboxIcons: []
    };
  }

  // Constructor hier weggenommen
  // constructor(
  //   private windowService: WindowService, 
  //   private scrollService: ScrollService
  
  // ) {}

  navigateTo(section: string) {
    this.scrollService.navigateToSection(section);
  }

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

