import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonComponent } from '../shared/button/button.component';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ButtonComponent, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  contactForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.pattern(/^[a-zA-Z\s]*$/)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    message: new FormControl('', [Validators.required, Validators.minLength(50), Validators.maxLength(369)]),
    privacy: new FormControl(false, [Validators.requiredTrue]),
    category: new FormControl('', [Validators.required]),
    customCategory: new FormControl('')
  });

  get name() { return this.contactForm.get('name'); }
  get email() { return this.contactForm.get('email'); }
  get message() { return this.contactForm.get('message'); }
  get privacy() { return this.contactForm.get('privacy'); }
  get category() { return this.contactForm.get('category'); }
  get customCategory() { return this.contactForm.get('customCategory'); }

  isFormValid(): boolean {
    return this.contactForm.valid;
  }

  getCharCount(): number {
    return this.message?.value?.length || 0;
  }
}

