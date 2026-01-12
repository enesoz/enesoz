import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Experience } from '../../models/ExperienceInterface';
import { TranslatePipe } from '../../../services/translate.pipe';
import { NgForOf, NgIf } from '@angular/common';

interface ExperienceGroup {
  company: string;
  logoUrl?: string;
  location: string;
  roles: Experience[];
}

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css'],
  imports: [
    TranslatePipe,
    NgIf,
    NgForOf
  ],
  standalone: true
})
export class ExperienceComponent implements OnChanges {
  @Input() experiences: Experience[] = [];
  groupedExperiences: ExperienceGroup[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['experiences'] && this.experiences) {
      this.groupExperiences();
    }
  }

  private groupExperiences(): void {
    this.groupedExperiences = [];
    if (!this.experiences.length) return;

    let currentGroup: ExperienceGroup | null = null;

    for (const exp of this.experiences) {
      if (currentGroup && currentGroup.company === exp.company) {
        // Add to existing group
        currentGroup.roles.push(exp);
      } else {
        // Start new group
        currentGroup = {
          company: exp.company,
          logoUrl: exp.logoUrl,
          location: exp.location,
          roles: [exp]
        };
        this.groupedExperiences.push(currentGroup);
      }
    }
  }
}
