import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CvData } from '../app/models/CvDataInterface';

/**
 * Service for retrieving CV data
 */
@Injectable({
  providedIn: 'root'
})
export class CvService {
  constructor(private http: HttpClient) { }

  /**
   * Gets the CV data from the JSON file based on language
   * @param lang - Language code ('en' or 'tr')
   * @returns Observable with the CvData
   */
  getCvData(lang: string = 'en'): Observable<CvData> {
    const filename = lang === 'tr' ? 'cv-data.tr.json' : 'cv-data.json';
    // Use the reliable i18n folder
    return this.http.get<CvData>(`assets/i18n/${filename}`);
  }
}
