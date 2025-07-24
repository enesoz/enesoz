import {Component, Input} from '@angular/core';
import {PersonalInfo} from '../../models/PersonalInfoInterfaces';
import {NgForOf} from '@angular/common';

/**
 * Header component that displays personal information and provides language switching functionality
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [
    NgForOf
  ]
})
export class HeaderComponent {
  @Input() personalInfo!: PersonalInfo;
}
