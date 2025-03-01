import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { ButtonComponent } from '../shared/button/button.component';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ButtonComponent, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit, OnDestroy {
  formSubmitted = false; // Zustand für "Erfolgreich gesendet"
  isLoading = false; // Ladespinner aktivieren
  formError = ''; // Fehlernachricht für Backend-Fehler
  dropdownOpen = false;
  selectedCategory = '';

  contactForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(40), Validators.pattern(/^[a-zA-Z\s]*$/)]),
    email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(40)]),
    message: new FormControl('', [Validators.required, Validators.minLength(50), Validators.maxLength(369)]),
    privacy: new FormControl(false, [Validators.requiredTrue]),
    category: new FormControl('', [Validators.required]),
    customCategory: new FormControl('', [Validators.maxLength(40)])
  });

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      document.addEventListener('click', this.closeDropdownOnClickOutside.bind(this));
    }
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      document.removeEventListener('click', this.closeDropdownOnClickOutside.bind(this));
    }
  }

  get name() { return this.contactForm.get('name'); }
  get email() { return this.contactForm.get('email'); }
  get message() { return this.contactForm.get('message'); }
  get privacy() { return this.contactForm.get('privacy'); }
  get category() { return this.contactForm.get('category'); }
  get customCategory() { return this.contactForm.get('customCategory'); }

  // Logik für eigenes Dropdown-Menü
  toggleDropdown(event?: Event) {
    if (event) {
      event.stopPropagation(); // Verhindert, dass der Click das Schließen auslöst
    }
    this.dropdownOpen = !this.dropdownOpen;
  }
  
  selectCategory(category: string) {
    this.selectedCategory = category;
    this.contactForm.patchValue({ category }); // Wert ins Formular übertragen

    // 🔥 Sicherstellen, dass das Dropdown schließt, auch wenn Angular den State nicht sofort aktualisiert
    setTimeout(() => {
      this.dropdownOpen = false;
    }, 300);

    // this.dropdownOpen = false; // Dropdown schließen nach Auswahl
  }

  closeDropdownOnClickOutside(event: Event) {
    if (isPlatformBrowser(this.platformId)) {
      const dropdownElement = document.querySelector('.custom-dropdown');
      if (dropdownElement && !dropdownElement.contains(event.target as Node)) {
        this.dropdownOpen = false;
      }
    }
  }

   /** Prüft, ob alle Felder korrekt sind & Button aktivieren */
   isFormValid(): boolean {
    return this.contactForm.valid && this.isCustomCategoryValid();
  }

  /** Zeichenanzahl für das Message-Feld */
  getCharCount(): number {
    return this.message?.value?.length || 0;
  }

  /** Prüft, ob das Custom-Feld erforderlich ist */
  isCustomCategoryValid(): boolean {
    return this.category?.value !== 'other' || ((this.customCategory?.value?? '').trim().length > 0);
  }


  /** Formular an Brevo senden */
  onSubmit(): void {
    if (!this.isFormValid()) return;

    this.isLoading = true; // Ladeanimation aktivieren
    this.formError = ''; // Fehler zurücksetzen

    const headers = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'accept': 'application/json',
      // 'api-key': environment.brevo.apiKey // 🔥 API-Key sicher aus environment.ts laden
      'api-key': environment.brevo.apiKey || '' // ✅ Falls API-Key undefined ist, nutze leeren String
    });

    // const formData = {
    //   name: this.name?.value,
    //   email: this.email?.value,
    //   message: this.message?.value,
    //   category: this.category?.value === 'other' ? this.customCategory?.value : this.category?.value
    // };

    // ✅ Der Prospect / oder Nutzer erhält Bestätigungsmail
    const formData = {
      sender: { email: "no-reply@mail.metafeller.com" }, // Deine verifizierte Brevo-Absender-Adresse
      to: [{ email: this.email?.value }], // Der User erhält die E-Mail
      subject: "Danke für deine Anfrage! 📩",
      htmlContent: /*html*/`
        <h2>Hallo ${this.name?.value},</h2>
        <p>Danke, dass du mich über mein Kontaktformular erreicht hast! Ich werde mich bald bei dir melden.</p>
        <p>Falls du nicht warten möchtest, kannst du direkt unverbindlich einen Termin buchen:</p>
        <a href="https://calendly.com/dein-link" style="display: inline-block; padding: 10px 20px; background: #007bff; color: white; text-decoration: none; border-radius: 5px;">📅 Kostenloses Erstgespräch buchen</a>
        <p>Falls du deine Bestätigungsmail nicht findest, überprüfe deinen E-Mail-Posteingang:</p>
        <a href="https://mail.google.com/" class="button">📧 E-Mail öffnen</a>
        <p>Bis bald und Beste Grüße!</p>
        <p>Dein, Savas</p>
      `
    };

    // ✅ Daten für Brevo-Kontaktliste
    const contactData = {
      email: this.email?.value,
      attributes: {
        NAME: this.name?.value,
        MESSAGE: this.message?.value,
        CATEGORY: this.category?.value === 'other' ? this.customCategory?.value : this.category?.value
      },
      listIds: [4] // ID deiner Brevo-Kontaktliste eintragen
    };

    // Sende Daten an Brevo-Kontaktliste
    this.http.post('https://api.brevo.com/v3/contacts', contactData, { headers }).subscribe();
    
    // Ich erhalte eine Kopie der Kontaktformular-Anfrage als E-Mail
    const adminMailData = {
      sender: { email: "no-reply@mail.metafeller.com" },
      to: [{ email: "mail@metafeller.com" }],
      subject: "Neue Kontaktanfrage erhalten!",
      htmlContent: `
        <h2>Neue Anfrage von ${this.name?.value}</h2>
        <p><strong>Name:</strong> ${this.name?.value}</p>
        <p><strong>E-Mail:</strong> ${this.email?.value}</p>
        <p><strong>Kategorie:</strong> ${this.category?.value === 'other' ? this.customCategory?.value : this.category?.value}</p>
        <p><strong>Nachricht:</strong> ${this.message?.value}</p>
      `
    };

    // const headers = new HttpHeaders({ 
    //   'Content-Type': 'application/json',
    //   'accept': 'application/json',
    //   // 'api-key': environment.brevo.apiKey // 🔥 API-Key sicher aus environment.ts laden
    //   'api-key': environment.brevo.apiKey || '' // ✅ Falls API-Key undefined ist, nutze leeren String
    // });

    // // Sende Daten an Brevo-Kontaktliste
    // this.http.post('https://api.brevo.com/v3/contacts', contactData, { headers }).subscribe();

    // ✅ Beide Anfragen absenden 
    this.http.post(environment.brevo.endpoint, formData, { headers }).subscribe();
    this.http.post(environment.brevo.endpoint, adminMailData, { headers })
      .subscribe({
        next: () => {
          this.formSubmitted = true; // Erfolgsmeldung anzeigen
          this.contactForm.reset(); // Formular leeren
          this.isLoading = false;

          // ✅ Konfetti + Sound starten 🎉🔊
          this.triggerConfetti();

          // ✅ Weiterleitung nach 3 Sekunden zur Danke-Seite
          setTimeout(() => {
            window.open('/thank-you.html', '_blank'); // 🔥 Dankeseite als echte HTML-Datei als Neues Tab öffnen!
          }, 3000);
        },
        error: (err) => {
          this.formError = 'Something went wrong. Please try again.';
          this.isLoading = false;
        }
      });
  }

  /** 🎉 Konfetti-Effekt starten */
  triggerConfetti() {
    const confetti = document.createElement("script");
    confetti.src = "https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0";
    confetti.onload = () => {
      (window as any).confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.9 }, // Konfetti von unten nach oben
      });
    };
    document.body.appendChild(confetti);

    // 🎵 Sound abspielen
    const sound = new Audio('./assets/sounds/yay-sound.mp3'); // 🔥✅ Eigene Sound-Datei aus dem public-Ordner
    sound.play();
  }

}

