import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http'; // ✅ Importiere provideHttpClient
import { HttpClient } from '@angular/common/http'; // ✅ Import notwendig!

import { routes } from './app.routes';

// ✅ ngx-translate imports
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { httpTranslateLoader } from './translate.loader';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    provideClientHydration(),
    provideHttpClient(withFetch()),

    // ✅ ngx-translate einbinden (Modern + Standalone)
    importProvidersFrom(
      TranslateModule.forRoot({
        defaultLanguage: 'de', // Sprache auf Deutsch setzen
        loader: {
          provide: TranslateLoader,
          useFactory: httpTranslateLoader,
          deps: [HttpClient] // ✅ DAS ist korrekt!
        }
      })
    )
  ]
};
