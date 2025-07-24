import { Component, Input, OnInit } from '@angular/core';
import { PersonalInfo } from '../../models/PersonalInfoInterfaces';
import { NgForOf } from '@angular/common';
import { TranslateService } from '../../../services/translate_service';
import { Router } from '@angular/router';

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
