import { Component } from '@angular/core';
import { ButtonComponent } from '../../shared/button/button.component';

@Component({
  selector: 'app-branding',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './branding.component.html',
  styleUrl: './branding.component.scss'
})
export class BrandingComponent {

}
