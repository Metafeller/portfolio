import { AfterViewInit, Directive, ElementRef, Inject, OnDestroy, PLATFORM_ID, ApplicationRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { first } from 'rxjs/operators';

@Directive({
  selector: 'video[appAutoplayKick]',
  standalone: true,
})
export class AutoplayKickDirective implements AfterViewInit, OnDestroy {
  private cleanups: Array<() => void> = [];

  constructor(
    private el: ElementRef<HTMLVideoElement>,
    private appRef: ApplicationRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const video = this.el.nativeElement;

    // Stelle sicher, dass alle Policy-relevanten Flags gesetzt sind
    video.muted = true;               // wichtig für Autoplay
    (video as any).playsInline = true;
    video.autoplay = true;
    video.loop = true;
    video.preload = 'auto';

    const tryPlay = () => {
      const p = video.play();
      if ((p as any)?.catch) { (p as Promise<void>).catch(() => { /* ignorieren */ }); }
    };

    // 1) Wenn Angular "stable" ist → abspielen
    this.appRef.isStable.pipe(first(Boolean)).subscribe(() => setTimeout(tryPlay, 0));

    // 2) Fallbacks: erstes Scrollen/Klicken/Tab wird sichtbar
    const onPointer = () => tryPlay();
    const onScroll = () => tryPlay();
    const onVisibility = () => { if (!document.hidden) tryPlay(); };

    window.addEventListener('pointerdown', onPointer, { once: true });
    window.addEventListener('scroll', onScroll, { once: true, passive: true });
    document.addEventListener('visibilitychange', onVisibility);

    this.cleanups.push(() => window.removeEventListener('pointerdown', onPointer));
    this.cleanups.push(() => window.removeEventListener('scroll', onScroll));
    this.cleanups.push(() => document.removeEventListener('visibilitychange', onVisibility));
  }

  ngOnDestroy(): void {
    this.cleanups.forEach(fn => fn());
  }
}
