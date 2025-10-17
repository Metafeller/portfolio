import { Component, OnDestroy, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { ScrollService } from '../../services/scroll.service';
import { SafeHtmlPipe } from '../../pipes/safe-html.pipe';

type LegalTab = 'legal' | 'privacy';

@Component({
  selector: 'app-legal-section',
  standalone: true,
  imports: [CommonModule, TranslateModule, SafeHtmlPipe],
  templateUrl: './legal-section.component.html',
  styleUrl: './legal-section.component.scss'
})
export class LegalSectionComponent implements OnInit, OnDestroy {
  @ViewChild('sectionTop') private sectionTop?: ElementRef<HTMLElement>; // 👈 NEU

  activeTab: LegalTab = 'legal';
  isOpen = false;
  lastUpdated = '';               // used for {{date}} in i18n
  private sub?: Subscription;
  private langSub?: Subscription;

  constructor(
    private scroll: ScrollService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.setLastUpdated(); // initial
    this.langSub = this.translate.onLangChange.subscribe(() => this.setLastUpdated());

    // React to header/footer requests like showLegal('legal'|'privacy')
    this.sub = this.scroll.legalDisplay$.subscribe((page) => {
      if (page === 'legal') {
        this.activeTab = 'legal';
        this.isOpen = true;
        this.scrollToSectionTopThen('impressum');
      } else if (page === 'privacy') {
        this.activeTab = 'privacy';
        this.isOpen = true;
        this.scrollToSectionTopThen('datenschutz');
      } else {
        this.isOpen = false; // 👈 schließen, wenn null
      }
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
    this.langSub?.unsubscribe();
  }

  onTabClick(event: Event, tab: LegalTab): void {
    event.preventDefault();
    this.activeTab = tab;
    this.scroll.scrollToElement(tab === 'legal' ? 'impressum' : 'datenschutz');
  }

  scrollToSectionTop(): void {
  // 1) bevorzugt direkt zum Container (präziser)
  if (this.sectionTop?.nativeElement) {
    this.sectionTop.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    return;
  }
  // 2) Fallback: globaler Anker unter dem Footer
  this.scroll.scrollToElement('footer-legal-anchor');
  }

  private scrollToSectionTopThen(anchorId: string): void {
    // Step 1: smooth scroll to section start
    this.scroll.scrollToElement('footer-legal-anchor');
    // Step 2: after a tiny delay, scroll to inner anchor (ensures a smooth feel)
    setTimeout(() => this.scroll.scrollToElement(anchorId), 120);
  }

  private setLastUpdated(): void {
    // 👉 Wenn du ein fixes Datum willst, hier anpassen:
    const fixedDate = new Date(2025, 9, 14); // 14 Oct 2025 (Monat ist 0-basiert)
    const lang = this.translate.currentLang || 'de';
    const locale = lang.startsWith('de') ? 'de-DE' : 'en-US';
    const fmt = new Intl.DateTimeFormat(locale, { day: '2-digit', month: 'long', year: 'numeric' });
    this.lastUpdated = fmt.format(fixedDate);
  }
}

