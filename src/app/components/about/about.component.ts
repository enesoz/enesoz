import { Component, Input } from '@angular/core';
import { About } from '../../models/PersonalInfoInterfaces';
import { TranslatePipe } from '../../../services/translate_pipe';
import { NgForOf, NgIf } from '@angular/common';

/**
 * About component that displays personal information like languages, experience, and military obligation
 */
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  imports: [
    TranslatePipe,
    NgForOf,
    NgIf
  ]
})
export class AboutComponent {
  @Input() about!: About;
}
