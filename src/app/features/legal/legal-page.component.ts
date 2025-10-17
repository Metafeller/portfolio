import { AfterViewInit, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SafeHtmlPipe } from '../../pipes/safe-html.pipe';
import { ScrollService } from '../../services/scroll.service';

@Component({
  selector: 'app-legal-page',
  standalone: true,
  imports: [CommonModule, TranslateModule, SafeHtmlPipe],
  templateUrl: './legal-page.component.html',
  styleUrl: './legal-page.component.scss',
})
export class LegalPageComponent implements AfterViewInit {
  constructor(private scroll: ScrollService) {}
  
  ngAfterViewInit(): void {
    // Kleine Verzögerung, damit DOM sicher steht
    setTimeout(() => this.scroll.scrollToElement('legal-page-anchor'), 60);
  }
}
