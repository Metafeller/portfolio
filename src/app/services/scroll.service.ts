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

  /** Scroll after Angular becomes stable and the view is rendered */
  private scrollWhenStable(targetId: string) {
  this.appRef.isStable
    .pipe(first(stable => stable))
    .subscribe(() => {
      // next tick – stellt sicher, dass lazy components im DOM sind
      setTimeout(() => this.scrollToElement(targetId), 0);
    });
  }

  // navigateToSection(route: string, fragment?: string) {
  // // 1) Legal/Privacy-Section schließen, falls offen
  // this.showLegal(null);

  navigateToSection(sectionId: string, fragment?: string) {
  // 1) Legal/Privacy-Section sicher schließen
  this.showLegal(null);

  // 2) zur gewünschten Route navigieren (z. B. '/about-me', '/skills', ...)
  //    -> Wir nutzen KEIN fragment in der Router-URL, weil wir selbst sanft scrollen
  // this.router.navigate([route]).then(() => {
  //   if (!this.isBrowser) return;

  //   // 3) Zielanker bestimmen:
  //   //    - Wenn fragment mitgegeben wurde, nimm fragment
  //   //    - sonst verwende den route-Namen als ID (Konvention: <section id="about-me"> ...)
  //   const targetId = fragment ?? route;

  //   // 4) Erst scrollen, wenn Angular stabil ist (Lazy-Komponenten im DOM)
  //   this.scrollWhenStable(targetId);
  //   });

  // 2) IMMER zur Startseite navigieren (kein zusätzl. Render im <router-outlet>)
    this.router.navigate(['']).then(() => {
      if (!this.isBrowser) return;

    // 3) Zielanker bestimmen (Konvention: id="about-me" usw.)
    const targetId = fragment ?? sectionId;

      // 4) Erst scrollen, wenn Angular stabil ist
    this.scrollWhenStable(targetId);
      });
  }


  /* ===============================================================
   * Impressum / Datenschutz ein- & ausblenden
   * =============================================================== */

  // showLegal(page: LegalPage) {

  //   /* 1)  neuen Status publishen */
  //   this.legalDisplaySubject.next(page);

  //   if (!page || !this.isBrowser) {
  //     // Server oder kein Page: kein Scroll
  //     return;
  //   }

  //   /* 2)  Browser & Page: erst scrollen (wenn DOM stabil ist), wenn Angular den neuen DOM fertig hat */
  //   if (page) {
  //     this.appRef.isStable
  //       .pipe(first(stable => stable))
  //       .subscribe(() =>
  //         setTimeout(() =>
  //           this.scrollToElement('footer-legal-anchor'), 0)
  //       );
  //   }
  // }

  /* ===============================================================
 * Impressum / Datenschutz ein- & ausblenden
 * =============================================================== */
  showLegal(page: LegalPage) {
    const onLegalRoute = /^\/(legal|privacy)(\/|$)/.test(this.router.url || '');

    // 1) Wenn wir auf einer Page-Route sind (/legal|/privacy) und eine Section öffnen sollen:
    if (page && onLegalRoute) {
      // erst zurück zur Startseite navigieren, damit die Page im <router-outlet> verschwindet
      this.router.navigate(['']).then(() => {
        // dann Section öffnen + smooth scroll
        this.legalDisplaySubject.next(page);
        if (!this.isBrowser) return;
        this.appRef.isStable
          .pipe(first(stable => stable))
          .subscribe(() => setTimeout(() => this.scrollToElement('footer-legal-anchor'), 0));
      });
      return;
    }

    // 2) Section schließen
    if (!page) {
      this.legalDisplaySubject.next(null);

      // Optional: Wenn wir uns noch auf einer Page-Route befinden, auch nach Home zurück
      if (onLegalRoute) {
        this.router.navigate(['']);
      }
      return;
    }

    // 3) Normalfall: Section öffnen, wenn wir NICHT auf /legal|/privacy sind
    this.legalDisplaySubject.next(page);

    if (!this.isBrowser) return;

    this.appRef.isStable
      .pipe(first(stable => stable))
      .subscribe(() =>
        setTimeout(() => this.scrollToElement('footer-legal-anchor'), 0)
      );
  }

}
