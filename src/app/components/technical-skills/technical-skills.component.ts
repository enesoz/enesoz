import { Component, Input } from '@angular/core';
import {TechnicalSkill} from '../../models/TechnicalSkillsInterface';
import {NgFor} from '@angular/common';
import {TranslatePipe} from '../../../services/translate_pipe';

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
  @Input() skills!: TechnicalSkill[];

  getSkillKeys(): string[] {
    return Object.keys(this.skills);
  }
  getSkillsBy(key: string): string[] {
    // @ts-ignore
    return this.skills[key];
  }
}
