// import { Routes } from '@angular/router';

// export const routes: Routes = [];

import { Routes } from '@angular/router';

export const routes: Routes = [

  { path: '', loadComponent: () => import('./hero/hero.component').then(m => m.HeroComponent) },
  { path: 'about-me', loadComponent: () => import('./about-me/about-me.component').then(m => m.AboutMeComponent) },
  { path: 'skills', loadComponent: () => import('./skills/skills.component').then(m => m.SkillsComponent) },
  { path: 'skills/branding', loadComponent: () => import('./skills/branding/branding.component').then(m => m.BrandingComponent) },
  { path: 'skills/developer', loadComponent: () => import('./skills/developer/developer.component').then(m => m.DeveloperComponent) },
  { path: 'skills/marketing', loadComponent: () => import('./skills/marketing/marketing.component').then(m => m.MarketingComponent) },
  { path: 'projects', loadComponent: () => import('./projects/projects.component').then(m => m.ProjectsComponent) },
  { path: 'contact', loadComponent: () => import('./contact/contact.component').then(m => m.ContactComponent) }, // Fix für Lazy Loading


  // ────────── neu für Impressum & Datenschutz ──────────
  {
    path: 'legalnotice',
    loadComponent: () => import('./pages/legal/legal.component').then(m => m.LegalComponent)
  },
  {
    path: 'privacypolicy',
    loadComponent: () => import('./pages/privacy/privacy.component').then(m => m.PrivacyComponent)
  },

  // Thank-You-Page wird nicht mehr genutzt als Komponente, stattdessen im Public Ordner als HTML und CSS
  // { path: 'thank-you', loadComponent: () => import('./thank-you/thank-you.component').then(m => m.ThankYouComponent) },


  { path: '**', redirectTo: '', pathMatch: 'full' } // Falls Route nicht existiert, gehe zur Startseite

];


