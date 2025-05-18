import { Component, Input } from '@angular/core';
import {TechnicalSkills} from '../../models/TechnicalSkillsInterface';
import {TitleCasePipe} from '@angular/common';
import {TranslatePipe} from '../../../services/translate_pipe';

@Component({
  selector: 'app-technical-skills',
  templateUrl: 'technical-skills-component.html',
  imports: [
    TitleCasePipe,
    TranslatePipe
  ],
  styleUrls: ['technical-skills-component.css']
})
export class TechnicalSkillsComponent {
  @Input() skills!: TechnicalSkills[];

  getSkillKeys(): string[] {
    return Object.keys(this.skills);
  }
}
