import { 
  Component, 
  OnInit, 
  OnDestroy, 
  AfterViewInit, 
  Inject, 
  Renderer2,
  ElementRef,
  PLATFORM_ID } from '@angular/core';
import { WindowService } from '../../window.service';
import { ButtonComponent } from '../../shared/button/button.component';
import { CommonModule } from '@angular/common';
import { ScrollService } from '../../services/scroll.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
// import { ServerTestingModule } from '@angular/platform-server/testing';

interface InfoboxIcon {
  src: string;
  alt: string;
}

@Component({
  selector: 'app-branding',
  standalone: true,
  imports: [ButtonComponent, CommonModule, TranslateModule],
  templateUrl: './branding.component.html',
  styleUrl: './branding.component.scss'
})

export class BrandingComponent implements OnInit, OnDestroy, AfterViewInit {
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
            observer.unobserve(entry.target);
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
      this.createSkill('brand-awareness', '/svg-icons/branding/brand-awareness-flowchart.png'),
      this.createSkill('brand-strategy', '/svg-icons/branding/brand-strategies.png'),
      this.createSkill('personal-brand', '/svg-icons/branding/personal-branding.png'),
      this.createSkill('target-group', '/svg-icons/branding/target-audience.png'),
      this.createSkill('positioning', '/svg-icons/branding/market-positioning.png'),
      this.createSkill('Unique-Selling-Point', '/svg-icons/branding/unique-selling-point.png'),
      this.createSkill('brandbook', '/svg-icons/branding/graphic-design.png'),
      this.createSkill('webdesign', '/svg-icons/branding/ux-ui-web-design.png'),
      this.createSkill('public-releations', '/svg-icons/branding/pr-public-relations.png'),
      this.createSkill('visability', '/svg-icons/branding/visability-strategies.png'),
      this.createSkill('AI-agency', '/svg-icons/branding/bot.png'),
  
      {
        name: 'Growth Mindset',
        icon: '/svg-icons/branding/growth-mindset-rare-green.png',
        isHovered: false,
        isInfoboxVisible: false,
        infoboxTitle: this.translate.instant('skills.branding.skills.growth.title'),
        infoboxDescription: this.translate.instant('skills.branding.skills.growth.description'),
        infoboxIcons: [
          { src: '/svg-icons/branding/artificial-intelligence-ai.png', alt: 'Artificial Intelligence' },
          // { src: '/svg-icons/skillset/vue-js-2-color.svg', alt: 'Vue.js' },
          { src: '/svg-icons/branding/blockchain-technologie.png', alt: 'Blockchain' },
          { src: '/svg-icons/branding/metaverse.png', alt: 'Metaverse NFTs' },
          // { src: '/svg-icons/branding/web-30.png', alt: 'Web 3.0' },
        ] as InfoboxIcon[]
      },
    ];
  }

  createSkill(key: string, iconPath: string): any {
    return {
      name: key.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      icon: iconPath,
      isHovered: false,
      isInfoboxVisible: false,
      infoboxTitle: this.translate.instant(`skills.branding.skills.${key}.title`),
      infoboxDescription: this.translate.instant(`skills.branding.skills.${key}.description`),
      infoboxIcons: [] as InfoboxIcon[]
    };
  }
  

  // constructor(
  //   private windowService: WindowService, 
  //   private scrollService: ScrollService,
  //   private translate: TranslateService
  // ) {}

  navigateTo(section: string) {
    this.scrollService.navigateToSection(section);
  }

  toggleInfobox(skill: any): void {
    if (this.windowService.isMobile() || this.windowService.isTablet()) {
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
      skill.isHovered = true;
    }
  }

  hideHover(skill: any): void {
    if (this.windowService.isDesktop()) {
      skill.isHovered = false;
    }
  }
}
