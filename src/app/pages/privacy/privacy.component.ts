import { Component, OnInit } from '@angular/core';
import { CommonModule }                         from '@angular/common';
import { TranslateModule, TranslateService }    from '@ngx-translate/core';
import { HttpClient }                           from '@angular/common/http';
import { Title, Meta }                          from '@angular/platform-browser';
import { Router }                               from '@angular/router';

@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule
  ],
  templateUrl: './privacy.component.html',
  styleUrl:   './privacy.component.scss'
})
export class PrivacyComponent implements OnInit {
  contentHtml = '';

  constructor(
    private translate: TranslateService,
    private http: HttpClient,
    private title: Title,
    private meta: Meta,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.setMetaTags();
    this.loadContent();
    this.translate.onLangChange.subscribe(() => this.loadContent());
  }

  private setMetaTags() {
    const t = this.translate.instant.bind(this.translate);
    this.title.setTitle(t('legal.privacy.title'));
    this.meta.updateTag({ name: 'description', content: t('legal.privacy.description') });
    this.meta.updateTag({ property: 'og:title', content: t('legal.privacy.title') });
    this.meta.updateTag({ property: 'og:description', content: t('legal.privacy.description') });
    this.meta.updateTag({ property: 'og:url', content: location.href });
  }

  private loadContent() {
    const lang = this.translate.currentLang || this.translate.getDefaultLang() || 'de';
    this.http
      .get(`/i18n/privacy-${lang}.json`, { responseType: 'text' })
      .subscribe({
        next: html => this.contentHtml = html,
        error: _    => this.router.navigate(['/'])
      });
  }
}
