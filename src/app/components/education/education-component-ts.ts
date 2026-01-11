import { Component, Input } from '@angular/core';
import { Education } from '../../models/EducationInterface';
import { TranslatePipe } from '../../../services/translate.pipe';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-education',
  templateUrl: 'education-component.html',
  imports: [
    TranslatePipe,
    NgForOf
  ],
  styleUrls: ['education-component.css']
})
export class EducationComponent {
  @Input() education: Education[] = [];
}
