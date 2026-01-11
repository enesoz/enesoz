import { Component, Input } from '@angular/core';
import { TechnicalSkill } from '../../models/TechnicalSkillsInterface';
import { NgFor } from '@angular/common';
import { TranslatePipe } from '../../../services/translate.pipe';

@Component({
  selector: 'app-technical-skills',
  templateUrl: 'technical-skills.component.html',
  imports: [
    TranslatePipe,
    NgFor
  ],
  styleUrls: ['technical-skills.component.css']
})
export class TechnicalSkillsComponent {
  @Input() skills!: TechnicalSkill;

  getSkillKeys(): string[] {
    return this.skills ? Object.keys(this.skills) : [];
  }
  getSkillsBy(key: string): string[] {
    return this.skills?.[key as keyof TechnicalSkill] || [];
  }
}
