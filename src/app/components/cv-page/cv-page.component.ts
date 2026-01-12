import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil, retry, catchError, finalize } from 'rxjs/operators';
import { CvService } from '../../../services/cv.service';
import { TranslateService } from '../../../services/translate.service';
import { StatsService } from '../../../services/stats.service';
import { CvData } from '../../models/CvDataInterface';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { TechnicalSkillsComponent } from '../technical-skills/technical-skills.component';
import { ExperienceComponent } from '../experience/experience.component';
import { EducationComponent } from '../education/education-component-ts';
import { AwardsComponent } from '../awards/awards.component';
import { ContactInfoComponent } from '../contact-info/contact-info-component-ts';
import { AboutComponent } from '../about/about.component';
import { PrintPageComponent } from '../print-page/print-page.component';

/**
 * CV Page Component - Main CV display page
 * Handles data loading, language switching, and error states
 */
@Component({
    selector: 'app-cv-page',
    standalone: true,
    imports: [
        CommonModule,
        HeaderComponent,
        TechnicalSkillsComponent,
        ExperienceComponent,
        EducationComponent,
        AwardsComponent,
        ContactInfoComponent,
        AboutComponent,
        PrintPageComponent
    ],
    templateUrl: './cv-page.component.html',
    styleUrl: './cv-page.component.css'
})
export class CvPageComponent implements OnInit, OnDestroy {
    cvData: CvData | null = null;
    loading = true;
    error = false;
    errorMessage = '';
    currentYear = new Date().getFullYear();
    lastUpdated = new Date('2025-07-01');
    viewCount = 0;
    downloadCount = 0;

    private destroy$ = new Subject<void>();

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private cvService: CvService,
        private translateService: TranslateService,
        private statsService: StatsService
    ) { }

    ngOnInit(): void {
        // Get language from route parameters and change the language
        this.route.paramMap
            .pipe(takeUntil(this.destroy$))
            .subscribe(params => {
                const langParam = params.get('lang');
                this.changeLanguage(langParam);
            });

        // Load stats
        this.statsService.incrementViews().pipe(takeUntil(this.destroy$)).subscribe(count => this.viewCount = count);
        this.statsService.getDownloads().pipe(takeUntil(this.destroy$)).subscribe(count => this.downloadCount = count);
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    private loadCvData(lang: string): void {
        this.cvService.getCvData(lang)
            .pipe(
                retry(2),
                catchError(err => {
                    console.error('Error loading CV data:', err);
                    this.errorMessage = 'Failed to load CV data. Please refresh the page.';
                    this.error = true;
                    throw err;
                }),
                finalize(() => this.loading = false),
                takeUntil(this.destroy$)
            )
            .subscribe({
                next: (data) => {
                    this.cvData = data;
                    this.error = false;
                    this.errorMessage = '';
                }
            });
    }

    changeLanguage(lang: string | null): void {
        const langToUse = lang ?? 'en';
        console.log(`📄 cv-page changeLanguage called with: ${lang}, using: ${langToUse}`);
        this.loading = true;
        this.error = false;

        this.translateService.setLanguage(langToUse)
            .pipe(
                finalize(() => {
                    if (!this.error) {
                        this.loadCvData(langToUse);
                    } else {
                        this.loading = false;
                        // Determine if we should redirect or show error
                        // If language load failed, it likely means invalid language -> Redirect to home
                        console.warn(`Redirecting to home due to language load failure: ${langToUse}`);
                        this.router.navigate(['/']);
                    }
                }),
                takeUntil(this.destroy$)
            )
            .subscribe({
                next: () => {
                    // Translation loaded successfully
                },
                error: (err) => {
                    console.error('Error loading translations:', err);
                    this.error = true;
                    // Error state is handled in finalize to allow redirect
                }
            });
    }
}
