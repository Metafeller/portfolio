import { 
  Component, 
  OnInit, 
  OnDestroy, 
  AfterViewInit,
  Inject,
  PLATFORM_ID,
  Renderer2,
  ElementRef
} from '@angular/core';
import { WindowService } from '../../window.service';
import { ButtonComponent } from '../../shared/button/button.component';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ScrollService } from '../../services/scroll.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

interface InfoboxIcon {
  src: string;
  alt: string;
}

@Component({
  selector: 'app-marketing',
  standalone: true,
  imports: [ButtonComponent, CommonModule, TranslateModule],
  templateUrl: './marketing.component.html',
  styleUrl: './marketing.component.scss',
})

export class MarketingComponent implements OnInit, OnDestroy, AfterViewInit {
  skills: any[] = [];
  private langChangeSub!: Subscription;

  constructor(
    private windowService: WindowService, 
    private scrollService: ScrollService,
    private translate: TranslateService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private renderer: Renderer2,
    private elRef: ElementRef
  ) {}

  ngOnInit(): void {
    this.loadSkills();
    this.langChangeSub = this.translate.onLangChange.subscribe(() => {
      this.loadSkills();
    });
  }  

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.observeElements();
    }
  }

  observeElements(): void {
    const elements = this.elRef.nativeElement.querySelectorAll(
      '.slide-in-left, .slide-in-right'
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.renderer.addClass(entry.target, 'in-view');
            observer.unobserve(entry.target); // Nur 1x animieren
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

    // Gruppe 1: Strategien und Kanäle
    // Gruppe 2: Technische Optimierung und Automatisierung
    // Gruppe 3: Lead-Generierung und Kundenbindung
    // Gruppe 4: Content und Partnerstrategien
    // Gruppe 5: Wachstum und Skalierung
  
  loadSkills(): void {
    this.skills = [
      this.createSkill('touchpoints', '/icons/marketing/channels.png'),
      this.createSkill('organic-campaigns', '/icons/marketing/organic-sprout.png'),
      this.createSkill('paid-ads', '/icons/marketing/meta.png'),
      this.createSkill('social-media', '/icons/marketing/social-media-advertising.png'),
      this.createSkill('SEO-strategies', '/icons/marketing/seo.png'),
      this.createSkill('funnel-concepts', '/icons/marketing/sales-funnel.png'),
      this.createSkill('automation', '/icons/marketing/lead-generation.png'),
      this.createSkill('content-marketing', '/icons/marketing/digital-content.png'),
      this.createSkill('email-marketing', '/icons/marketing/lead-generation.png'),
      this.createSkill('analytics', '/icons/marketing/up-arrow.png'),
      this.createSkill('AI-marketing', '/icons/branding/bot.png'),
      
      {
        name: 'Exponential Growth Strategies',
        icon: '/icons/marketing/growth-strategies-pestle.png',
        isHovered: false,
        isInfoboxVisible: false,
        infoboxTitle: this.translate.instant('skills.marketing.skills.growth.title'),
        infoboxDescription: this.translate.instant('skills.marketing.skills.growth.description'),
        infoboxIcons: [
          { src: '/icons/marketing/customer-journey.png', alt: 'Data Driven' },
          { src: '/icons/marketing/account-management-network.png', alt: 'KPI Tracking' },
          { src: '/icons/marketing/up-arrow.png', alt: 'Conversion Optimization' },
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
      infoboxTitle: this.translate.instant(`skills.marketing.skills.${key}.title`),
      infoboxDescription: this.translate.instant(`skills.marketing.skills.${key}.description`),
      infoboxIcons: [] as InfoboxIcon[]
    };
  }

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
