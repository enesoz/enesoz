import { Component, Input } from '@angular/core';
import { Experience } from '../../models/ExperienceInterface';
import { TranslatePipe } from '../../../services/translate_pipe';
import { NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css'],
  imports: [
    TranslatePipe,
    NgIf,
    NgForOf
  ],
  standalone: true
})
export class ExperienceComponent {
  @Input() experiences: Experience[] = [];
}
