import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { About } from '../../models/PersonalInfoInterfaces';
import { TranslatePipe } from '../../../services/translate.pipe';
import { NgForOf, NgIf } from '@angular/common';
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
    NgForOf,
    NgIf
  ]
})
export class AboutComponent implements OnChanges {
  @Input() about!: About;
  @Input() experiences: Experience[] = [];

  calculatedExperience: string = '';

  constructor(private translateService: TranslateService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['experiences'] || changes['about']) {
      this.calculateTotalExperience();
    }
  }

  /**
   * Calculates the total experience by summing up all experience periods
   */
  private calculateTotalExperience(): void {
    const starts = (this.experiences || [])
      .map(exp => exp.start.split(' '))
      .filter(parts => parts.length === 2 && this.getMonthNumber(parts[0]) !== -1)
      .map(parts => new Date(parseInt(parts[1]), this.getMonthNumber(parts[0])));

    if (starts.length === 0) {
      this.calculatedExperience = this.about.experience;
      return;
    }

    const first = new Date(Math.min(...starts.map(d => d.getTime())));
    const now = new Date();
    const months = (now.getFullYear() - first.getFullYear()) * 12 + (now.getMonth() - first.getMonth());
    const years = Math.floor(months / 12);
    this.calculatedExperience = `${years}+ ${this.translateService.translate('header.years')}`;
  }

  /**
   * Converts month name to month number (0-11)
   */
  private getMonthNumber(monthName: string): number {
    const months = [
      'january', 'february', 'march', 'april', 'may', 'june',
      'july', 'august', 'september', 'october', 'november', 'december'
    ];

    const monthsTr = [
      'ocak', 'şubat', 'mart', 'nisan', 'mayıs', 'haziran',
      'temmuz', 'ağustos', 'eylül', 'ekim', 'kasım', 'aralık'
    ];
    const name = monthName.toLocaleLowerCase('tr');
    const index = months.indexOf(monthName.toLowerCase());
    return index !== -1 ? index : monthsTr.indexOf(name);
  }
}
