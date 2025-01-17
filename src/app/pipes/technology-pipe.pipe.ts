import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'technologyPipe',
  standalone: true,
})
export class TechnologyPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: { name: string; icon: string }[]): SafeHtml {
    const formatted = value
      .map(
        (tech) =>
          `<span style="display: flex; align-items: center; gap: 8px;">
            <img src="${tech.icon}" alt="${tech.name}" style="width: 20px; height: 20px; object-fit: contain;" />
            <span>${tech.name}</span>
          </span>`
      )
      .join(
        ' <span style="color: var(--accent-color); margin: 0 8px;">|</span> '
      );
    return this.sanitizer.bypassSecurityTrustHtml(formatted);
  }
}
