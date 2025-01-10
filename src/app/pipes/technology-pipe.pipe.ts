import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'technologyPipe',
  standalone: true,
})
export class TechnologyPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string[]): SafeHtml {
    const formatted = value.join(
      ' <span style="color: var(--accent-color);">|</span> '
    );
    return this.sanitizer.bypassSecurityTrustHtml(formatted);
  }
}
