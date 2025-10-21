import { Component, HostListener } from '@angular/core';
import { CommonModule }            from '@angular/common';
// import { TranslateService, LangChangeEvent, TranslateModule } from '@ngx-translate/core';

// import { Router, NavigationEnd }   from '@angular/router';
// import { filter }                  from 'rxjs/operators';
import { RouterModule } from '@angular/router';

// import { ScrollService } from './services/scroll.service';
// import { SafeHtmlPipe }  from './pipes/safe-html.pipe';

import { TranslateModule } from '@ngx-translate/core';
// (no TranslateService needed here)
// (no Router/NavigationEnd here)
// (no ScrollService here)

/* ─ Stand-alone Sektionen ─ */
import { HeaderComponent }   from './shared/header/header.component';
import { HeroComponent }     from './hero/hero.component';
import { AboutMeComponent }  from './about-me/about-me.component';
import { SkillsComponent }   from './skills/skills.component';
import { ProjectsComponent } from './projects/projects.component';
import { ReviewsComponent }  from './reviews/reviews.component';
import { ContactComponent }  from './contact/contact.component';
import { FooterComponent }   from './shared/footer/footer.component';
import { CookieBannerComponent } from './cookie-banner/cookie-banner.component';
import { LegalSectionComponent } from './features/legal/legal-section.component';
import { LegalOverlayComponent } from './features/legal/legal-overlay.component';

@Component({
  selector  : 'app-root',
  standalone: true,
  imports   : [
    CommonModule, 
    RouterModule,
    // SafeHtmlPipe, 
    TranslateModule,
    HeaderComponent, 
    HeroComponent, 
    AboutMeComponent,
    SkillsComponent, 
    ProjectsComponent, 
    ReviewsComponent,
    ContactComponent, 
    FooterComponent, 
    CookieBannerComponent,
    // LegalSectionComponent,
    LegalOverlayComponent
  ],
  templateUrl: './app.component.html',
  styleUrl   : './app.component.scss'
})
export class AppComponent {

constructor() {}

  /* ---------- Cursor-Shadow (unverändert) ---------- */
  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    const shadow = document.getElementById('cursor-shadow');
    if (shadow) {
      shadow!.style.left = `${e.clientX}px`;
      shadow!.style.top  = `${e.clientY}px`;
    }
  }
}
