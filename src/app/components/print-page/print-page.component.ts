import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslatePipe } from '../../../services/translate.pipe';
import { TranslateService } from '../../../services/translate.service';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { StatsService } from '../../../services/stats.service';

@Component({
  selector: 'app-print-page',
  standalone: true,
  templateUrl: './print-page.component.html',
  styleUrls: ['./print-page.component.css'],
  imports: [
    CommonModule, // Use CommonModule
    TranslatePipe
  ]
})
export class PrintPageComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  constructor(
    private titleService: Title,
    private translateService: TranslateService,
    private router: Router,
    private route: ActivatedRoute,
    private statsService: StatsService
  ) { }

  printCV(): void {
    this.titleService.setTitle(`Enes_Ozdemir_CV_${this.currentLang.toUpperCase()}`);
    this.statsService.incrementDownloads().pipe(takeUntil(this.destroy$)).subscribe();
    window.print();
  }

  async downloadPDF(): Promise<void> {
    const element = document.querySelector('.cv-container') as HTMLElement;
    if (!element) return;

    // Add class to hide UI elements
    document.body.classList.add('generating-pdf');

    try {
      // Dynamically import html2pdf to avoid SSR/build issues if any
      const html2pdf = (await import('html2pdf.js')).default;

      const opt = {
        margin: 10,
        filename: `Enes_Ozdemir_CV_${this.currentLang.toUpperCase()}.pdf`,
        image: { type: 'jpeg' as const, quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          logging: false
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' as const },
        pagebreak: { mode: ['css', 'legacy'], avoid: ['.job', '.education-item', '.award-item', '.skill-category'] }
      };

      // Generate and open in new tab
      this.statsService.incrementDownloads().pipe(takeUntil(this.destroy$)).subscribe();
      await html2pdf().set(opt).from(element).output('bloburl').then((pdfUrl: string) => {
        window.open(pdfUrl, '_blank');
      });
    } finally {
      // Remove class to show UI elements again
      document.body.classList.remove('generating-pdf');
    }
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
