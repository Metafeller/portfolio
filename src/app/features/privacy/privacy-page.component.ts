import { AfterViewInit, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';                 // ✅ NEU
import { TranslateModule } from '@ngx-translate/core';
import { SafeHtmlPipe } from '../../pipes/safe-html.pipe';
import { ScrollService } from '../../services/scroll.service';

@Component({
  selector: 'app-privacy-page',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule, SafeHtmlPipe],
  templateUrl: './privacy-page.component.html',
  styleUrl: './privacy-page.component.scss',
})
export class PrivacyPageComponent implements AfterViewInit {
  constructor(private scroll: ScrollService) {}

  ngAfterViewInit(): void {
    setTimeout(() => this.scroll.scrollToElement('legal-page-anchor'), 60);
  }

  scrollToTop(): void {
    this.scroll.scrollToElement('legal-page-anchor');
  }
}

