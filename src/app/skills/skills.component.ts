import { Component } from '@angular/core';
import { DeveloperComponent } from './developer/developer.component';
import { BrandingComponent } from './branding/branding.component';
import { MarketingComponent } from "./marketing/marketing.component";

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [
    DeveloperComponent,
    BrandingComponent,
    MarketingComponent
],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss'
})
export class SkillsComponent {

}
