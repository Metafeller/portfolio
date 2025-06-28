import { Component, HostListener } from '@angular/core';
import { CommonModule }            from '@angular/common';
import { TranslateService, LangChangeEvent, TranslateModule } from '@ngx-translate/core';

import { Router, NavigationEnd }   from '@angular/router';       // ← neu
import { filter }                  from 'rxjs/operators';         // ← neu
import { RouterModule } from '@angular/router';

import { ScrollService } from './services/scroll.service';
import { SafeHtmlPipe }  from './pipes/safe-html.pipe';

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

@Component({
  selector  : 'app-root',
  standalone: true,
  imports   : [
    CommonModule, 
    RouterModule,
    SafeHtmlPipe, 
    TranslateModule,
    HeaderComponent, 
    HeroComponent, 
    AboutMeComponent,
    SkillsComponent, 
    ProjectsComponent, 
    ReviewsComponent,
    ContactComponent, 
    FooterComponent, 
    CookieBannerComponent
  ],
  templateUrl: './app.component.html',
  styleUrl   : './app.component.scss'
})
export class AppComponent {

  /* ---------- Felder für das Template ---------- */
  showLegal     = false;                     // *ngIf
  legalHeading  = '';                       // H1
  legalHtml     = '';                       // <div [innerHTML]>
  private activePage: 'legal' | 'privacy' | null = null;

  constructor(
    public scrollSrv : ScrollService,
    private translate  : TranslateService,
    private router    : Router                 // ← hier injizieren
  ) {

    // a) Panel-Status wenn jemand im Footer klickt
    this.scrollSrv.legalDisplay$.subscribe(page => {
      this.activePage = page;
      this.refreshLegalContent();
    });

    // b) Sprachwechsel während Panel offen
    this.translate.onLangChange.subscribe(
      (_: LangChangeEvent) => this.refreshLegalContent()
    );

    // c) Router-Abonnement für direkten URL-Aufruf
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: NavigationEnd) => {
        if (e.urlAfterRedirects === '/legalnotice') {
          // Panel öffnen für Impressum
          this.scrollSrv.showLegal('legal');
        } else if (e.urlAfterRedirects === '/privacypolicy') {
          // Panel öffnen für Datenschutz
          this.scrollSrv.showLegal('privacy');
        } else {
          // Panel schließen, wenn man woanders hin navigiert
          this.scrollSrv.showLegal(null);
        }
      });
  }


  /* Holt Überschrift + HTML frisch aus den JSON-Keys ------------- */
  private refreshLegalContent(): void {
    if (!this.activePage) {                 // Panel schließen
      this.showLegal = false;
      this.legalHtml = this.legalHeading = '';
      return;
    }
    this.legalHeading = this.translate.instant(`${this.activePage}.heading`);
    this.legalHtml    = this.translate.instant(`${this.activePage}.content`);
    this.showLegal    = true;
  }

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
