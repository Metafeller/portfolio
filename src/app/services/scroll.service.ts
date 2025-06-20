/*  src/app/services/scroll.service.ts  */
import { Injectable, ApplicationRef } from '@angular/core';
import { Router }                     from '@angular/router';
import { BehaviorSubject, first }     from 'rxjs';

type LegalPage = 'legal' | 'privacy' | null;

@Injectable({ providedIn: 'root' })
export class ScrollService {

  /* ---------- interner Status + Observable ---------- */
  private legalDisplaySubject = new BehaviorSubject<LegalPage>(null);
  legalDisplay$               = this.legalDisplaySubject.asObservable();

  constructor(
    private router: Router,
    private appRef: ApplicationRef          // ⬅️  brauchen wir fürs „stable“
  ) {}

  /* ===============================================================
   * Allgemeines Scrolling
   * =============================================================== */
  public scrollToElement(id: string) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  navigateToSection(route: string, fragment?: string) {
    /* beim Wechsel -> Rechtstexte schließen */
    this.showLegal(null);

    this.router.navigate([route]).then(() => {
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

    /* 2)  erst scrollen, wenn Angular den neuen DOM fertig hat */
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
