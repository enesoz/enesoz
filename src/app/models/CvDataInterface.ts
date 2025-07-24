import { PersonalInfo } from './PersonalInfoInterfaces';
import { Experience } from './ExperienceInterface';
import { Education } from './EducationInterface';
import { Award } from './AwardInterface';
import { TechnicalSkill } from './TechnicalSkillsInterface';

/**
 * Interface representing the complete CV data structure
 */
export interface CvData {
  personalInfo: PersonalInfo;
  technicalSkills: TechnicalSkill[];
  experiences: Experience[];
  education: Education[];
  awards: Award[];
}
