import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() buttonClass: string = 'default-button'; // Standardklasse für Buttons
  // @Input() label: string = ''; // Label für den Button
  @Input() type: string = 'button'; // Typ des Buttons (z. B. submit, reset, button)
  @Input() disabled: boolean = false;
}
