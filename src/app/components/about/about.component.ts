import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { About } from '../../models/PersonalInfoInterfaces';
import { TranslatePipe } from '../../../services/translate_pipe';
import { NgForOf } from '@angular/common';
import { Experience } from '../../models/ExperienceInterface';
import { TranslateService } from '../../../services/translate.service';

/**
 * About component that displays personal information like languages, experience, and military obligation
 */
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  imports: [
    TranslatePipe,
    NgForOf
  ]
})
export class AboutComponent implements OnChanges {
  @Input() about!: About;
  @Input() experiences: Experience[] = [];

  calculatedExperience: string = '';

  constructor(private translateService: TranslateService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['experiences']) {
      this.calculateTotalExperience();
    }
  }

  /**
   * Calculates the total experience by summing up all experience periods
   */
  private calculateTotalExperience(): void {
    if (!this.experiences || this.experiences.length === 0) {
      this.calculatedExperience = this.about.experience;
      return;
    }

    const currentDate = new Date();
    let totalMonths = 0;

    this.experiences.forEach(exp => {
      // Parse start date
      const startParts = exp.start.split(' ');
      if (startParts.length !== 2) return;

      const startMonth = this.getMonthNumber(startParts[0]);
      const startYear = parseInt(startParts[1]);

      // Parse end date
      let endMonth: number;
      let endYear: number;

      if (exp.end.toLowerCase() === 'now') {
        endMonth = currentDate.getMonth();
        endYear = currentDate.getFullYear();
      } else {
        const endParts = exp.end.split(' ');
        if (endParts.length !== 2) return;

        endMonth = this.getMonthNumber(endParts[0]);
        endYear = parseInt(endParts[1]);
      }

      // Calculate months between dates
      const months = (endYear - startYear) * 12 + (endMonth - startMonth);
      totalMonths += months > 0 ? months : 0;
    });

    // Convert total months to years and months
    const years = Math.floor(totalMonths / 12);
    const remainingMonths = totalMonths % 12;

    const yearsText = this.translateService.translate('header.years');
    const monthsText = this.translateService.translate('header.months');

    if (years > 0 && remainingMonths > 0) {
      this.calculatedExperience = `${years} ${yearsText}, ${remainingMonths} ${monthsText}`;
    } else if (years > 0) {
      this.calculatedExperience = `${years} ${yearsText}`;
    } else {
      this.calculatedExperience = `${remainingMonths} ${monthsText}`;
    }
  }

  /**
   * Converts month name to month number (0-11)
   */
  private getMonthNumber(monthName: string): number {
    const months = [
      'january', 'february', 'march', 'april', 'may', 'june',
      'july', 'august', 'september', 'october', 'november', 'december'
    ];

    return months.findIndex(month => month.toLowerCase() === monthName.toLowerCase());
  }
}
