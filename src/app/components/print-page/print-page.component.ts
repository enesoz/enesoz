import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslatePipe } from '../../../services/translate.pipe';
import { TranslateService } from '../../../services/translate.service';
import { NgForOf } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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
export class PrintPageComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  constructor(
    private titleService: Title,
    private translateService: TranslateService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

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
   * Initialize component and subscribe to route changes
   */
  ngOnInit(): void {
    // Get current language from service
    this.currentLang = this.translateService.getCurrentLang();

    // Subscribe to route parameter changes to keep currentLang in sync
    this.route.paramMap
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        const langParam = params.get('lang');
        if (langParam) {
          this.currentLang = langParam;
        }
      });
  }

  /**
   * Cleanup subscriptions
   */
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Switch to the selected language
   * @param lang - Language code to switch to
   */
  switchLanguage(lang: string): void {
    // Only navigate - the cv-page component will handle the language change
    // and we'll get notified via route parameter subscription
    this.router.navigate([lang]);
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
