import { Component, OnInit } from '@angular/core';
import { RouterOutlet, ActivatedRoute } from '@angular/router';
import { CvService } from '../services/cv.service';
import { PrintPageComponent } from './components/print-page/print-page.component';
import { HeaderComponent } from './components/header/header.component';
import { TechnicalSkillsComponent } from './components/technical-skills/technical-skills-component-ts';
import { ExperienceComponent } from './components/experience/experience.component';
import { EducationComponent } from './components/education/education-component-ts';
import { AwardsComponent } from './components/awards/awards-component-ts';
import { ContactInfoComponent } from './components/contact-info/contact-info-component-ts';
import { AboutComponent } from './components/about/about.component';
import { TranslateService } from '../services/translate.service';
import { CommonModule } from '@angular/common';
import { CvData } from './models/CvDataInterface';

@Component({
  selector: 'app-root',
  imports: [
    PrintPageComponent,
    HeaderComponent,
    TechnicalSkillsComponent,
    ExperienceComponent,
    EducationComponent,
    AwardsComponent,
    ContactInfoComponent,
    AboutComponent,
    CommonModule
  ],
  templateUrl: 'app.component.html',
  styleUrl: 'app.component.css'
})
export class AppComponent implements OnInit {
  title = 'my-cv';
  cvData: CvData | null = null;
  loading = true;
  error = false;
  languages = ['tr', 'en'];
  currentYear = new Date().getFullYear();

  constructor(
    private cvService: CvService,
    private translateService: TranslateService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    // Get language from route parameters and change the language
    this.route.paramMap.subscribe(params => {
      const langParam = params.get('lang');
      this.changeLanguage(langParam);
    });
  }


  private loadCvData() {
    this.cvService.getCvData().subscribe({
      next: (data) => {
        this.cvData = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading CV data:', error);
        this.error = true;
        this.loading = false;
      }
    });
  }

  changeLanguage(lang: string | null) {
    let langToUse = lang === null ? 'tr' : lang;
    this.translateService.setLanguage(langToUse).subscribe({
      next: () => {
        this.loadCvData();
      }
    });
  }
}
