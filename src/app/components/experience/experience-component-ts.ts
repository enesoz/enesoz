import {Component, Input} from '@angular/core';
import {Experience} from '../../models/ExperienceInterface';
import {TranslatePipe} from '../../../services/translate_pipe';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-experience',
  templateUrl: 'experience-component.html',
  imports: [
    TranslatePipe,
    NgIf,
    NgForOf
  ],
  styleUrls: ['experience-component.css']
})
export class ExperienceComponent {
  @Input() experiences: Experience[] = [];
}
