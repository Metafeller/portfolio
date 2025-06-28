/*  src/app/services/scroll.service.ts  */
import { Injectable, ApplicationRef, Inject, PLATFORM_ID } from '@angular/core';
import { Router }                     from '@angular/router';
import { BehaviorSubject, first }     from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

type LegalPage = 'legal' | 'privacy' | null;

@Injectable({ providedIn: 'root' })
export class ScrollService {

  /* ---------- interner Status + Observable ---------- */
  private legalDisplaySubject = new BehaviorSubject<LegalPage>(null);
  legalDisplay$               = this.legalDisplaySubject.asObservable();
  private isBrowser: Boolean;

  constructor(
    private router: Router,
    private appRef: ApplicationRef,          // ⬅️  brauchen wir fürs „stable“
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    // Plattform-Flag setzen
    this.isBrowser = isPlatformBrowser(platformId);
  }

  /* ===============================================================
   * Allgemeines Scrolling (nur im Browser)
   * =============================================================== */
  public scrollToElement(id: string) {
    if (!this.isBrowser) return;                    // Server: nichts tun
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  navigateToSection(route: string, fragment?: string) {
    /* beim Wechsel -> Rechtstexte schließen */
    this.showLegal(null);

    this.router.navigate([route]).then(() => {
      if (!this.isBrowser) return;
      setTimeout(() =>
        this.scrollToElement(fragment ?? route), 80);
    });
  }

  /* ===============================================================
   * Impressum / Datenschutz ein- & ausblenden
   * =============================================================== */
  showLegal(page: LegalPage) {

    /* 1)  neuen Status publishen */
    this.legalDisplaySubject.next(page);

    if (!page || !this.isBrowser) {
      // Server oder kein Page: kein Scroll
      return;
    }

    /* 2)  Browser & Page: erst scrollen (wenn DOM stabil ist), wenn Angular den neuen DOM fertig hat */
    if (page) {
      this.appRef.isStable
        .pipe(first(stable => stable))
        .subscribe(() =>
          setTimeout(() =>
            this.scrollToElement('footer-legal-anchor'), 0)
        );
    }
  }
}
