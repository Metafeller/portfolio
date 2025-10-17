// import { Routes } from '@angular/router';

// export const routes: Routes = [];

import { Routes, CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { ScrollService } from './services/scroll.service';

const openLegalGuard: CanActivateFn = () => {
  const router = inject(Router);
  const scroll = inject(ScrollService);
  // Nach der Navigation zur Startseite den Smooth-Scroll triggern
  setTimeout(() => scroll.showLegal('legal'), 0);
  // Zur Startseite umleiten (Option A: alles auf einer Seite)
  return router.parseUrl('');
};

const openPrivacyGuard: CanActivateFn = () => {
  const router = inject(Router);
  const scroll = inject(ScrollService);
  setTimeout(() => scroll.showLegal('privacy'), 0);
  return router.parseUrl('');
};

export const routes: Routes = [

  // { path: '', loadComponent: () => import('./hero/hero.component').then(m => m.HeroComponent) },
  // { path: 'about-me', loadComponent: () => import('./about-me/about-me.component').then(m => m.AboutMeComponent) },
  // { path: 'skills', loadComponent: () => import('./skills/skills.component').then(m => m.SkillsComponent) },
  // { path: 'skills/branding', loadComponent: () => import('./skills/branding/branding.component').then(m => m.BrandingComponent) },
  // { path: 'skills/developer', loadComponent: () => import('./skills/developer/developer.component').then(m => m.DeveloperComponent) },
  // { path: 'skills/marketing', loadComponent: () => import('./skills/marketing/marketing.component').then(m => m.MarketingComponent) },
  
  // { path: 'projects', loadComponent: () => import('./projects/projects.component').then(m => m.ProjectsComponent) },
  // { path: 'contact', loadComponent: () => import('./contact/contact.component').then(m => m.ContactComponent) }, // Fix für Lazy Loading


  // ✅ Fallback-Deep-Links (Option A bleibt One-Page)
  // ✅ NEU – dedizierte Seiten
  { path: 'legal', loadComponent: () => import('./features/legal/legal-page.component').then(m => m.LegalPageComponent) },
  { path: 'privacy', loadComponent: () => import('./features/privacy/privacy-page.component').then(m => m.PrivacyPageComponent) },

  // Thank-You-Page wird nicht mehr genutzt als Komponente, stattdessen im Public Ordner als HTML und CSS
  // { path: 'thank-you', loadComponent: () => import('./thank-you/thank-you.component').then(m => m.ThankYouComponent) },

  // Wildcard Route (muss am Ende stehen)
  // { path: '**', redirectTo: '', pathMatch: 'full' } 
  // Falls Route nicht existiert, gehe zur Startseite

];


