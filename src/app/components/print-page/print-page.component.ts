import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {TranslatePipe} from '../../../services/translate_pipe';
import {TranslateService} from '../../../services/translate_service';
import {NgForOf} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-print-page',
  standalone: true,
  templateUrl: './print-page.component.html',
  styleUrls: ['./print-page.component.css'],
  imports: [
    TranslatePipe,
    NgForOf
  ]
})
export class PrintPageComponent implements OnInit {
  constructor(private titleService: Title, private translateService: TranslateService, private router: Router
  ) {}

  printCV(): void {
    this.titleService.setTitle('Enes Özdemir - CV');
    window.print();
  }

  downloadPDF(): void {
    // This function would normally require a PDF conversion service
    // Let's simply redirect to the print dialog
    alert(this.translateService.translate('print.downloadAlert'));
    this.printCV();
  }


  // Available languages
  languages = [
    { code: 'en', name: 'English' },
    { code: 'tr', name: 'Türkçe' }
  ];

  // Current language
  currentLang: string = 'tr';

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
