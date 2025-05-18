import {Component, Input} from '@angular/core';
import {Experience} from '../../models/ExperienceInterface';

@Component({
  selector: 'app-experience',
  templateUrl: 'experience-component.html',
  styleUrls: ['experience-component.css']
})
export class ExperienceComponent {
  @Input() experiences: Experience[] = [];
}
