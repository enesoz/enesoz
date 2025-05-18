import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {CvService} from '../services/cv-service-ts';
import {PrintPageComponent} from './components/print-page/print-page-component-ts';
import {HeaderComponent} from './components/header/header-component-ts';
import {TechnicalSkillsComponent} from './components/technical-skills/technical-skills-component-ts';
import {ExperienceComponent} from './components/experience/experience-component-ts';
import {EducationComponent} from './components/education/education-component-ts';
import {AwardsComponent} from './components/awards/awards-component-ts';
import {TranslateService} from '../services/translate_service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PrintPageComponent, HeaderComponent, TechnicalSkillsComponent, ExperienceComponent, EducationComponent, AwardsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'my-cv';
  cvData: any;
  loading = true;
  error = false;
  languages = ['tr', 'en'];

  constructor(
    private cvService: CvService,
    private translateService: TranslateService
  ) {
  }

  ngOnInit() {
    // Önce varsayılan dil çevirilerini yükle
    this.translateService.loadTranslations(this.translateService.getCurrentLang())
      .subscribe(() => {
        // Sonra CV verilerini yükle
        this.cvService.getCvData().subscribe(
          (data) => {
            this.cvData = data;
            this.loading = false;
          },
          (error) => {
            console.error('Error loading CV data:', error);
            this.error = true;
            this.loading = false;
          }
        );
      });
  }

  changeLanguage(lang: string) {
    this.translateService.setLanguage(lang).subscribe();
  }
}
