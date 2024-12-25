import { Component } from '@angular/core';
import { DeveloperComponent } from './developer/developer.component';
import { BrandingComponent } from './branding/branding.component';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [
    DeveloperComponent,
    BrandingComponent
  ],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss'
})
export class SkillsComponent {

}
