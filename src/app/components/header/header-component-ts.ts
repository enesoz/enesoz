import { Component, Input } from '@angular/core';
import {PersonalInfo} from '../../models/PersonalInfoInterfaces';
import {TranslatePipe} from '../../../services/translate_pipe';
import {NgFor, NgForOf} from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: 'header-component.html',
  imports: [
    TranslatePipe,
    NgForOf
  ],
  styleUrls: ['header-component.css']
})
export class HeaderComponent {
  @Input() personalInfo!: PersonalInfo;
}
