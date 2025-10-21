import { Component, HostListener, OnDestroy, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { ScrollService } from '../../services/scroll.service';
import { SafeHtmlPipe } from '../../pipes/safe-html.pipe';

type LegalTab = 'legal' | 'privacy';

@Component({
  selector: 'app-legal-overlay',
  standalone: true,
  imports: [CommonModule, TranslateModule, SafeHtmlPipe],
  templateUrl: './legal-overlay.component.html',
  styleUrl: './legal-overlay.component.scss'
})
export class LegalOverlayComponent implements OnInit, OnDestroy {
  @ViewChild('panel') private panel?: ElementRef<HTMLElement>; // ⬅️ Referenz auf das Scroll-Panel

  isOpen = false;
  activeTab: LegalTab = 'legal';
  lastUpdated = '';
  private sub?: Subscription;
  private langSub?: Subscription;

  constructor(
    private scroll: ScrollService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.setLastUpdated();
    this.langSub = this.translate.onLangChange.subscribe(() => this.setLastUpdated());

    this.sub = this.scroll.legalDisplay$.subscribe(page => {
      this.isOpen = !!page;
      if (page) this.activeTab = page;
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
    this.langSub?.unsubscribe();
  }

  switchTab(tab: LegalTab) { this.activeTab = tab; }

  close() { this.scroll.closeLegalOverlay(); }

  @HostListener('document:keydown.escape')
  onEsc() { if (this.isOpen) this.close(); }

  // ⬅️ Diese Methode fehlte – Button im Template ruft sie auf
  scrollToTop(): void {
    this.panel?.nativeElement.scrollTo({ top: 0, behavior: 'smooth' });
  }

  private setLastUpdated(): void {
    const fixedDate = new Date(2025, 9, 14); // 14 Oct 2025
    const lang = this.translate.currentLang || 'de';
    const locale = lang.startsWith('de') ? 'de-DE' : 'en-US';
    const fmt = new Intl.DateTimeFormat(locale, { day: '2-digit', month: 'long', year: 'numeric' });
    this.lastUpdated = fmt.format(fixedDate);
  }
}
