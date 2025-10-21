/*  src/app/services/scroll.service.ts  */
import { Injectable, ApplicationRef, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, first } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

type LegalPage = 'legal' | 'privacy' | null;

// Body scroll lock class when overlay is open
const BODY_LOCK_CLASS = 'overlay-open';

@Injectable({ providedIn: 'root' })
export class ScrollService {
  /** Overlay state: 'legal' | 'privacy' | null */
  private legalDisplaySubject = new BehaviorSubject<LegalPage>(null);
  legalDisplay$ = this.legalDisplaySubject.asObservable();

  private isBrowser: boolean;

  constructor(
    private router: Router,
    private appRef: ApplicationRef,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  /* ===============================================================
   * Generic smooth scrolling
   * =============================================================== */
  public scrollToElement(id: string) {
    if (!this.isBrowser) return;
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  /** Scroll after Angular becomes stable and view is rendered */
  private scrollWhenStable(targetId: string) {
    this.appRef.isStable
      .pipe(first(Boolean))
      .subscribe(() => setTimeout(() => this.scrollToElement(targetId), 0));
  }

  /* ===============================================================
   * One-page navigation to sections (always via Home)
   * =============================================================== */
  navigateToSection(sectionId: string, fragment?: string) {
    // Always close overlay first
    this.closeLegalOverlay();

    // Always navigate to home (so <router-outlet> is empty)
    this.router.navigate(['']).then(() => {
      if (!this.isBrowser) return;
      const targetId = fragment ?? sectionId;
      this.scrollWhenStable(targetId);
    });
  }

  /* ===============================================================
   * Legal / Privacy OVERLAY control
   * =============================================================== */
  private isOnLegalRoute(): boolean {
    return /^\/(legal|privacy)(\/|$)/.test(this.router.url || '');
  }

  /** Open overlay with selected tab; returns to Home first if on /legal or /privacy */
  openLegalOverlay(page: Exclude<LegalPage, null>) {
    const openNow = () => {
      this.legalDisplaySubject.next(page);
      if (this.isBrowser) document.body.classList.add(BODY_LOCK_CLASS);
    };

    if (this.isOnLegalRoute()) {
      this.router.navigate(['']).then(openNow);
    } else {
      openNow();
    }
  }

  /** Close overlay; also go Home if user is on /legal or /privacy page route */
  closeLegalOverlay() {
    this.legalDisplaySubject.next(null);
    if (this.isBrowser) document.body.classList.remove(BODY_LOCK_CLASS);

    if (this.isOnLegalRoute()) {
      this.router.navigate(['']);
    }
  }

  /* ===============================================================
   * Backward-compat shim (falls noch alte Aufrufe existieren)
   * =============================================================== */
  showLegal(page: LegalPage) {
    if (page) this.openLegalOverlay(page);
    else this.closeLegalOverlay();
  }
}
