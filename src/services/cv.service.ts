import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CvData } from '../app/models/CvDataInterface';

import * as jsonData from '../assets/cv-data.json';

/**
 * Service for retrieving CV data
 */
@Injectable({
  providedIn: 'root'
})
export class CvService {
  /**
   * Gets the CV data from the JSON file
   * @returns Observable with the CvData
   */
  getCvData(): Observable<CvData> {
    return of(jsonData as unknown as CvData);
  }
}
