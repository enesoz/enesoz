import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-technical-skills',
  templateUrl: './technical-skills.component.html',
  styleUrls: ['./technical-skills.component.css']
})
export class TechnicalSkillsComponent {
  @Input() skills: any;
  
  getSkillKeys(): string[] {
    return Object.keys(this.skills);
  }
}