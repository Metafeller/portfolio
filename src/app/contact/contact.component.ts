import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonComponent } from '../shared/button/button.component';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ButtonComponent, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  formSubmitted = false; // Zustand für "Erfolgreich gesendet"
  isLoading = false; // Ladespinner aktivieren
  formError = ''; // Fehlernachricht für Backend-Fehler

  contactForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.pattern(/^[a-zA-Z\s]*$/)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    message: new FormControl('', [Validators.required, Validators.minLength(50), Validators.maxLength(369)]),
    privacy: new FormControl(false, [Validators.requiredTrue]),
    category: new FormControl('', [Validators.required]),
    customCategory: new FormControl('')
  });

  constructor(private http: HttpClient) {}

  get name() { return this.contactForm.get('name'); }
  get email() { return this.contactForm.get('email'); }
  get message() { return this.contactForm.get('message'); }
  get privacy() { return this.contactForm.get('privacy'); }
  get category() { return this.contactForm.get('category'); }
  get customCategory() { return this.contactForm.get('customCategory'); }

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

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.post('https://formspree.io/f/xqaeblej', formData, { headers })
      .subscribe({
        next: () => {
          this.formSubmitted = true; // Erfolgsmeldung anzeigen
          this.contactForm.reset(); // Formular leeren
          this.isLoading = false;
        },
        error: (err) => {
          this.formError = 'Something went wrong. Please try again.';
          this.isLoading = false;
        }
      });
  }
}

