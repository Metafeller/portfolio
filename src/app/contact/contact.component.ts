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

  /** Formular an Formspree senden */
  // onSubmit(): void {
  //   if (!this.isFormValid()) return;

  //   this.isLoading = true; // Ladeanimation aktivieren
  //   this.formError = ''; // Fehler zurücksetzen

  //   const formData = {
  //     name: this.name?.value,
  //     email: this.email?.value,
  //     message: this.message?.value,
  //     category: this.category?.value === 'other' ? this.customCategory?.value : this.category?.value
  //   };

  //   const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  //   this.http.post('https://formspree.io/f/xqaeblej', formData, { headers })
  //     .subscribe({
  //       next: () => {
  //         this.formSubmitted = true; // Erfolgsmeldung anzeigen
  //         this.contactForm.reset(); // Formular leeren
  //         this.isLoading = false;
  //       },
  //       error: (err) => {
  //         this.formError = 'Something went wrong. Please try again.';
  //         this.isLoading = false;
  //       }
  //     });
  // }

  // Alternative Lösung: Formular an Resend senden!!!
  onSubmit(): void {
    if (!this.isFormValid()) {
      this.formError = '⚠️ Please complete all fields correctly.';
      return;
    }
  
    this.isLoading = true; // Ladeanimation aktivieren
    this.formError = ''; // Fehler zurücksetzen
  
    const formData = {
      from: `contact@${environment.resend.domain}`,
      to: this.email?.value,
      subject: "Thank you for reaching out!",
      html: `
        <h2>Hey ${this.name?.value},</h2>
        <p>Thank you for your message! I'll get back to you as soon as possible.</p>
        <br/>
        <p><strong>Your Message:</strong></p>
        <p>${this.message?.value}</p>
      `,
    };
  
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${environment.resend.apiKey}`
    });
  
    this.http.post(environment.resend.endpoint, formData, { headers })
      .subscribe({
        next: () => {
          this.formSubmitted = true;
          this.contactForm.reset();
          this.isLoading = false;
        },
        error: (err) => {
          this.formError = '❌ Something went wrong. Please try again.';
          this.isLoading = false;
        }
      });
  }
  
}

