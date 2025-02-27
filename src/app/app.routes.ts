// import { Routes } from '@angular/router';

// export const routes: Routes = [];

import { Routes } from '@angular/router';

export const routes: Routes = [
//   { path: '', loadComponent: () => import('./hero/hero.component').then(m => m.HeroComponent) },
  { path: 'contact', loadComponent: () => import('./contact/contact.component').then(m => m.ContactComponent) }, // Fix für Lazy Loading
  { path: 'thank-you', loadComponent: () => import('./thank-you/thank-you.component').then(m => m.ThankYouComponent) },
  { path: '**', redirectTo: '', pathMatch: 'full' } // Falls Route nicht existiert, gehe zur Startseite
];


