import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { ButtonComponent } from '../shared/button/button.component';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
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

  // Neue Variablen für das Overlay-Popup
  overlayVisible = false;
  updateConfirmed = false;

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


  // ***** Neue onSubmit()-Methode für die Firebase API *****


  /** 🔥 Formular an Firebase-API und danach Brevo senden 🔥 */
  onSubmit(): void {
    if (!this.isFormValid()) return;

    this.isLoading = true; // Ladeanimation aktivieren
    this.formError = ''; // Fehler zurücksetzen

    const formData = {
      name: this.name?.value,
      email: this.email?.value,
      message: this.message?.value,
      category: this.category?.value === 'other' ? this.customCategory?.value : this.category?.value
    };

    // ✅ Kontaktanfrage absenden!
    this.http.post(environment.firebaseApi, formData).subscribe({
      next: (response: any) => {
        console.log("✅ API Response erhalten:", response);
        if (response && response.success) {
          // Falls duplicate true ist, zeige das Overlay-Popup
          if (response.duplicate) {
            this.overlayVisible = true;
            this.isLoading = false;
          } else {
            this.handleSuccess();
          }
        } else {
          console.error("❌ Fehler: API-Antwort enthält kein success: true!", response);
          this.formError = 'Fehler: Die API hat keine Erfolgsantwort zurückgegeben.';
          this.isLoading = false;
        }
      },
      error: (error) => {
        console.error("❌ Fehler beim Absenden:", error);
        this.formError = 'Something went wrong. Please try again.';
        this.isLoading = false;
      }
    });
  }

  
  // Diese Methode wird aufgerufen, wenn der Nutzer im Overlay "Einverstanden" klickt.
  confirmUpdate(): void {
    this.overlayVisible = false;
    this.handleSuccess();
  }

  // Diese Methode wird aufgerufen, wenn der Nutzer im Overlay "Nicht Einverstanden" klickt.
  cancelUpdate(): void {
    // Schließe das Overlay, sodass der Nutzer seine E-Mail ändern kann.
    this.overlayVisible = false;
    this.isLoading = false;
    // Optional: Du kannst hier noch eine Benachrichtigung anzeigen oder das Formular in den Bearbeitungsmodus setzen.
  }

  // Diese Methode verarbeitet den Erfolg (Erfolgsmeldung, Konfetti, Weiterleitung).
  handleSuccess(): void {
    this.formSubmitted = true;
    this.contactForm.reset();
    this.isLoading = false;
    this.triggerConfetti();
    setTimeout(() => {
      window.open('/thank-you.html', '_blank');
    }, 3000);
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
    const sound = new Audio('/sounds/yay-sound.mp3'); // 🔥✅ Eigene Sound-Datei aus dem public-Ordner
    sound.play();
  }

}

