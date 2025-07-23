import { Component, Input, OnInit } from '@angular/core';
import { PersonalInfo } from '../../models/PersonalInfoInterfaces';
import { TranslatePipe } from '../../../services/translate_pipe';
import { NgForOf } from '@angular/common';
import { TranslateService } from '../../../services/translate_service';
import { Router } from '@angular/router';

/**
 * Header component that displays personal information and provides language switching functionality
 */
@Component({
  selector: 'app-header',
  templateUrl: 'header-component.html',
  imports: [
    TranslatePipe,
    NgForOf
  ],
  styleUrls: ['header-component.css']
})
export class HeaderComponent implements OnInit {
  @Input() personalInfo!: PersonalInfo;

  // Available languages
  languages = [
    { code: 'en', name: 'English' },
    { code: 'tr', name: 'Türkçe' }
  ];

  // Current language
  currentLang: string = 'tr';

  /**
   * Constructor with dependency injection
   * @param translateService - Service for handling translations
   * @param router - Router for navigation
   */
  constructor(
    private translateService: TranslateService,
    private router: Router
  ) {}

  /**
   * Initialize component
   */
  ngOnInit(): void {
    // Get current language from service
    this.currentLang = this.translateService.getCurrentLang();
  }

  /**
   * Switch to the selected language
   * @param lang - Language code to switch to
   */
  switchLanguage(lang: string): void {
    // Navigate to the route with the selected language code
    this.router.navigate([lang]);

    // Update the current language in the service and component
    this.translateService.setLanguage(lang).subscribe(success => {
      if (success) {
        this.currentLang = lang;
      }
    });
  }

  /**
   * Check if the given language is currently active
   * @param lang - Language code to check
   * @returns True if the language is active
   */
  isActive(lang: string): boolean {
    return this.currentLang === lang;
  }
}
