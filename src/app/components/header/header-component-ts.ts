import { Component, Input } from '@angular/core';
import {PersonalInfo} from '../../models/PersonalInfoInterfaces';

@Component({
  selector: 'app-header',
  templateUrl: 'header-component.html',
  styleUrls: ['header-component.css']
})
export class HeaderComponent {
  @Input() personalInfo!: PersonalInfo;
}
